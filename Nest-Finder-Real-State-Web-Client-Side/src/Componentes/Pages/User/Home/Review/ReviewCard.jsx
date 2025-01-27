

const ReviewCard = ({ item }) => {

    const { reviewerName, reviewerImage, reviewDescription, propertyTitle } = item
    return (

        <div className="flex border-2 border-black p-4 gap-10 rounded-xl items-center">
            <div className="avatar">
                <div className="w-24 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                    <img src={reviewerImage} />
                </div>
            </div>
            <div>
                <p className="font-bold text-xl">{reviewerName}</p>
                <p className="font-medium text-lg">{propertyTitle}</p>
                <p className="font-normal text-base">{reviewDescription}</p>
            </div>
        </div>
    );
};

export default ReviewCard;