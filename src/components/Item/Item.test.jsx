import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Item from './Item';

describe('Item', () => {
    test('Komponentti renderöityy merkinnän tiedoilla', () => {
        // Määritellään merkinnän tiedot. 
        const data = {
            id: "1",
            type: "Sähkö",
            amount: 437.50,
            paymentDate: "2023-03-20",
            periodStart: "2022-12-01",
            periodEnd:   "2023-02-28",
            receiver:    "Caruna Oy"
        }
        render(<Item data={data} />, {wrapper: BrowserRouter})

        const locale = "fi-FI";

        const typeElement = screen.getByText(data.type);
        expect(typeElement).toBeInTheDocument();

        const paymentDate = new Date(data.paymentDate).toLocaleDateString(locale);
        const dateElement = screen.getByText(paymentDate);
        expect(dateElement).toBeInTheDocument();

        const receiverElement = screen.getByText(data.receiver);
        expect(receiverElement).toBeInTheDocument();
    })
})