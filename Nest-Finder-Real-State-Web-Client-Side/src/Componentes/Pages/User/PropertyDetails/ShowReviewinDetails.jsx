
const ShowReviewinDetails = ({ item }) => {
    const { userName, userEmail, userImage, review, propertyTitle, status } = item

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'text-orange-300';
            case 'rejected':
                return 'text-red-500';
            case 'verified':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };
    return (

        <div className="flex border-2 border-black p-4 gap-10 rounded-xl items-center">
            <div className="avatar">
                <div className="w-24 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                    <img src={userImage} />
                </div>
            </div>
            <div className="space-y-2 flex-1">
                <div>
                    <p className="font-bold text-xl">{userName}</p>
                    <p className="font-normal text-sm">{userEmail}</p>
                </div>
                <p className="font-medium text-lg">
                    {propertyTitle} (<span className={getStatusClass(status)}>{status}</span>)
                </p>
                <p className="font-normal text-base">{review}</p>
            </div>
        </div>
    );
};

export default ShowReviewinDetails;