
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageReviewCard = ({ item }) => {
    const { userEmail, userImage, userName, review, propertyTitle, status, _id } = item;
    const axiosSecure = useAxiosSecure();

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

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/reviews/${_id}`);
                if (res.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'The review has been deleted.',
                        'success'
                    );
                    // Optionally refresh the reviews list or handle the deletion UI update
                }
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'An error occurred while deleting the review.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="flex border-2 border-black p-4 gap-10 rounded-xl items-center">
            <div className="avatar">
                <div className="w-24 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                    <img src={userImage} alt={userName} />
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
                <div className="flex justify-end">
                    <button onClick={handleDelete} className="btn btn-warning hover:bg-red-700 bg-red-600 btn-md text-black px-4 py-2 rounded-md">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageReviewCard;
