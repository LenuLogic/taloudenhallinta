import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe('Header', () => {
    test('Komponentti renderöityy tekstillä', () => {
        render(<Header />)

        const header = screen.getByText('Taloudenhallinta')
        expect(header).toBeInTheDocument()
    })
})