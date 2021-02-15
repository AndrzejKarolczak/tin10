import React from 'react';
import {quotes} from "../data/Quotes";
import QuoteRow from "./QuoteRow";
import './QuotesTableStyle.css';

class QuotesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {series: quotes};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        let newQuoteDate = document.getElementById("quote-date").value;
        let newQuoteValue = document.getElementById("quote-value").value;

        if (newQuoteDate !== "" && newQuoteValue !== "") {
            let newArray = this.state.series.map(r => r);

            let found = newArray.find(r => r.quoteDate === newQuoteDate);
            if (found !== undefined) {
                found.quoteValue = newQuoteValue;
            } else {
                let newRow = {quoteDate: newQuoteDate, quoteValue: newQuoteValue};
                newArray.push(newRow);
            }

            newArray.sort((l, r) =>
                new Date(l.quoteDate) - new Date(r.quoteDate)
            );

            this.setState({series: newArray});
        }
    }

    render() {
        return (
            <div>
                <fieldset>
                    <label htmlFor="quote-date">Data kwotowania</label>
                    <input type="date" id="quote-date" name="quote-date"/>
                    <label htmlFor="quote-value">Wartość kwotowania</label>
                    <input type="number" step="any" min="0.0001" id="quote-value" name="quote-value"/>
                    <input type="submit" value="Dodaj/Zmień" onClick={this.handleClick}/>
                </fieldset>

                <table id="quotes-table">
                    <caption>Kursy USDPLN</caption>
                    <thead>
                    <tr>
                        <td>Data kwotowania</td>
                        <td>Wartość kwotowania</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.series.map((quote) =>
                        <QuoteRow key={quote.quoteDate.toString()} rowData={quote}/>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default QuotesTable;