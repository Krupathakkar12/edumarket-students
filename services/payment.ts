
export const paymentService = {
    generateUPILink: (upiId: string, amount: number, bookTitle: string, transactionNote: string = ''): string => {
        // UPI payment URL format
        // upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&tn=NOTE&cu=INR

        const params = new URLSearchParams({
            pa: upiId, // Payee UPI ID
            pn: 'EduMarket', // Payee name
            am: amount.toString(), // Amount
            tn: transactionNote || `Payment for ${bookTitle}`, // Transaction note
            cu: 'INR' // Currency
        });

        return `upi://pay?${params.toString()}`;
    },

    openUPIPayment: (upiId: string, amount: number, bookTitle: string): void => {
        const upiLink = paymentService.generateUPILink(upiId, amount, bookTitle);
        window.location.href = upiLink;
    },

    formatPrice: (price: number): string => {
        return `₹${price.toLocaleString('en-IN')}`;
    }
};
