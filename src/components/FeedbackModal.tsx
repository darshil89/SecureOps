import { useSession } from "next-auth/react";
import React, { useState } from "react";

const FeedbackModal: React.FC<{ guard: any; onClose: () => void }> = ({
  guard,
  onClose,
}) => {
  const { data: session } = useSession(); // ✅ Fetch session correctly
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) {
      alert("You must be logged in to submit feedback.");
      return;
    }

    const request = await fetch("/api/user/feedback", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        feedback,
        mail: session.user.email, // ✅ Correctly access user email
        guard: guard.email,
      }),
    });

    const resData = await request.json();
    if (resData) console.log(resData);

    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-3">
          Feedback for {guard.name}
        </h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            placeholder="Enter your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
