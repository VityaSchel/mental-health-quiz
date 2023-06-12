export {}

declare global {
  interface Window {
    cp: {
      CloudPayments: () => {}
    } 
  }
}