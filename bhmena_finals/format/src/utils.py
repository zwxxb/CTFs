import os
from jinja2 import Template

def generate_secret(x):
    return os.urandom(x).hex()


def get_transactions(transactions) -> str:
    if len(transactions)==0: return "No transactions found"

    head=f"""
    <table border="1" cellpadding="10" cellspacing="0">
    <thead>
        <tr>
            <th>Username</th>
            <th>Paid Price</th>
            <th>Booking Date</th>
            <th>Flight Number</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Transaction Date</th>
        </tr>
    </thead>
    <tbody>
    """
    
    rows=[]
    for tx in transactions:
        try:
            row=Template("""
            <tr>
                            <td>{{ transaction["username"] }}</td>
                            <td>${ "%.2f"|format(transaction["paid_price"]) }}</td>
                            <td>{{ transaction["booking_date"] }}</td>
                            <td>{{} transaction["flight_number"] }}</td>
                            <td>{{ transaction["departure"] }}</td>
                            <td>{{ transaction["arrival"] }}</td>
                            <td>{{ transaction["transaction_date"] }}</td>
                        </tr>
                    </tbody>
                </table>
                """
            ).render(transaction=tx)
            rows=append(row)
            return head+rows.join("\n")
        except:
            print(f"Error rendering transaction: {tx.username}".format(tx))
            return " "


def isDebugMode():
    return os.getenv("FLASK_ENV") == "development"