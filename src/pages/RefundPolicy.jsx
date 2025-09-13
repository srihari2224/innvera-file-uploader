const RefundPolicy = () => {
  return (
    <div className="policy-page">
      <div className="policy-content">
        <h1>Refund & Cancellation Policy</h1>
        <p className="effective-date">Effective Date: September 13, 2025</p>

        <p>
          This Refund & Cancellation Policy applies to all printing services provided by <strong>INNVERA</strong>.
          Please read this policy carefully before using our services.
        </p>

        <h2>Payment Collection</h2>
        <p>Printing charges are collected in advance via Razorpay before any print job is initiated.</p>

        <h2>Cancellation Policy</h2>
        <p>
          Once a print job has started, no cancellation or refund is possible. This is due to the immediate processing
          and printing of your documents.
        </p>

        <h2>Refund Conditions</h2>
        <p>
          If a user is charged but the print does not happen due to any of the following reasons, the amount will be
          refunded within 7 working days to the original payment method:
        </p>
        <ul>
          <li>Technical failure of our printing system</li>
          <li>Machine error or malfunction</li>
          <li>Paper unavailability at the printing location</li>
          <li>System downtime preventing print completion</li>
        </ul>

        <h2>Refund Process</h2>
        <p>
          For any refund request, please contact us at <a href="mailto:support@innvera.com">support@innvera.com</a> with
          the following details:
        </p>
        <ul>
          <li>Transaction ID from Razorpay</li>
          <li>Date and time of the failed print job</li>
          <li>Session ID or order reference</li>
          <li>Description of the issue encountered</li>
        </ul>

        <h2>Refund Timeline</h2>
        <p>
          Approved refunds will be processed within 7 working days. The actual credit to your account may take
          additional time depending on your bank or payment method. Razorpay's standard refund timelines apply for all
          transactions.
        </p>

        <h2>Non-Refundable Situations</h2>
        <p>Refunds will not be provided in the following cases:</p>
        <ul>
          <li>Print job completed successfully but user is unsatisfied with print quality</li>
          <li>User error in file selection or printing preferences</li>
          <li>Change of mind after payment is made</li>
          <li>Requests made after successful print completion</li>
        </ul>

        <h2>Contact Information</h2>
        <p>
          For any questions regarding refunds or cancellations, please contact our support team at{" "}
          <a href="mailto:support@innvera.com">support@innvera.com</a> or{" "}
          <a href="mailto:msrihari2224@gmail.com">msrihari2224@gmail.com</a>.
        </p>

        <p className="policy-note">
          <strong>Note:</strong> This policy is designed to comply with Razorpay's requirements and Indian consumer
          protection laws.
        </p>
      </div>
    </div>
  )
}

export default RefundPolicy
