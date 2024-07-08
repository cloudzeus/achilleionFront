import Image from "next/image";

export const Testimonials = ({ reviews }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6 md:mx-14">
      {reviews.slice(0, 3).map((review) => (
        <ReviewCard key={`review-card-${review.tempId}`} review={review} />
      ))}
    </div>
  );
};

const MAX_STARS = 5;

const ReviewCard = ({ review }) => {
  const stars = Array.from({ length: review.rate }, () => 1);
  const unstars = Array.from({ length: MAX_STARS - review.rate }, () => 1);

  return (
    <div className="max-w-lg mx-auto bg-white flex flex-col shadow-lg rounded-2xl border border-gray-100 p-[22px]">
      <div className="flex items-center mb-4">
        <Image
          src={review.imgSrc} // Replace with the actual image URL
          alt="User"
          width={46}
          height={46}
          className="rounded-full mr-4"
        />
        <div className="text-[16px] font-semibold ">{review.by}</div>
      </div>
      <div className="text-gray-700 text-[10px] mb-4 flex-grow">
        {review.testimonial}
      </div>
      <div className="flex items-center">
        <div className="flex text-green-500">
          {stars.map((_, idx) => (
            <div key={`stars-sdkn34-${idx}`} className="text-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.302 4.01a1 1 0 00.95.69h4.211c.969 0 1.372 1.24.588 1.81l-3.415 2.49a1 1 0 00-.363 1.118l1.302 4.01c.3.92-.755 1.688-1.54 1.118l-3.415-2.49a1 1 0 00-1.175 0l-3.415 2.49c-.784.57-1.84-.198-1.54-1.118l1.302-4.01a1 1 0 00-.363-1.118L2.11 9.436c-.784-.57-.381-1.81.588-1.81h4.211a1 1 0 00.95-.69l1.302-4.01z" />
              </svg>
            </div>
          ))}

          {unstars.map((_, idx) => (
            <div key={`stars-sdkn34-${idx}`} className="text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.302 4.01a1 1 0 00.95.69h4.211c.969 0 1.372 1.24.588 1.81l-3.415 2.49a1 1 0 00-.363 1.118l1.302 4.01c.3.92-.755 1.688-1.54 1.118l-3.415-2.49a1 1 0 00-1.175 0l-3.415 2.49c-.784.57-1.84-.198-1.54-1.118l1.302-4.01a1 1 0 00-.363-1.118L2.11 9.436c-.784-.57-.381-1.81.588-1.81h4.211a1 1 0 00.95-.69l1.302-4.01z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
