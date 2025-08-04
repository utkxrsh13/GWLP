import React, { useState } from 'react';

const FeedbackWidget = ({ onFeedbackSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      onFeedbackSubmit({ rating, comment });
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setRating(0);
        setComment('');
      }, 2000);
    }
  };

  const feedbackEmojis = ['😞', '😐', '🙂', '😊', '🤩'];
  const feedbackLabels = ['Poor', 'Fair', 'Good', 'Great', 'Excellent'];

  return (
    <>
      {/* Feedback Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 animate-float"
        >
          <span className="text-2xl">💬</span>
        </button>
      </div>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-fadeIn">
            {!submitted ? (
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    💭 How was your experience?
                  </h3>
                  <p className="text-gray-600">
                    Help us improve our groundwater predictions!
                  </p>
                </div>

                {/* Star Rating */}
                <div className="mb-6">
                  <p className="text-center text-gray-700 mb-4 font-medium">Rate your experience:</p>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transform transition-all duration-200 hover:scale-125"
                      >
                        <span 
                          className={`text-4xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ⭐
                        </span>
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <div className="text-center mt-3 animate-fadeIn">
                      <span className="text-3xl">{feedbackEmojis[rating - 1]}</span>
                      <p className="text-lg font-semibold text-gray-700">
                        {feedbackLabels[rating - 1]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Comment */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Additional comments (optional):
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us more about your experience..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="3"
                  />
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      rating > 0
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            ) : (
              /* Thank You Message */
              <div className="p-8 text-center animate-fadeIn">
                <div className="mb-4">
                  <span className="text-6xl animate-bounce">🎉</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Your feedback helps us improve our service.
                </p>
                <div className="mt-4">
                  <span className="text-2xl">💚</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;
