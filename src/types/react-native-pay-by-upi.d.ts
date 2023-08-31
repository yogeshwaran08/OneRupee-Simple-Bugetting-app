declare module 'react-native-pay-by-upi' {
    interface UpiPaymentResponse {
      Status: 'SUCCESS' | 'FAILURE' | 'SUBMITTED' | 'USERCANCELLED';
      txnId: string;
      txnRef: string;
      responseCode: string;
      approvalRefNo: string;
    }
  
    type UpiPaymentOptions = {
      vpa: string;
      payeeName: string;
      amount: string;
      transactionRef: string;
      transactionNote: string;
      merchantCode?: string;
    };
  
    type SuccessCallback = (response: UpiPaymentResponse) => void;
    type FailureCallback = (error: Error) => void;
  
    function initializePayment(
      options: UpiPaymentOptions,
      successCallback: SuccessCallback,
      failureCallback: FailureCallback
    ): void;
  
    export {
      UpiPaymentResponse,
      UpiPaymentOptions,
      SuccessCallback,
      FailureCallback,
      initializePayment,
    };
  }
  