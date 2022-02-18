import React from "react";
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import MyObservations from './MyObservations';

const wrapper = ''

test('button has correct title', () => {
    render(<MyObservations />);
    const linkElement = screen.getByText(/My Recorded Observations/i);
    expect(linkElement).toBeInTheDocument();
})

test('renders App without crashing', () => {
    render(<MyObservations />);
    const linkElement = screen.getByRole('heading' ,{name: "My Recorded Observations"});
    expect(linkElement).toHaveStyle({display: 'block'})
})


test('renders App without crashing', () => {
    render(<MyObservations />);
    const linkElement = screen.getByRole('heading' ,{name: "Bird Details"});
    expect(linkElement).toHaveStyle({display: 'block'})
})

