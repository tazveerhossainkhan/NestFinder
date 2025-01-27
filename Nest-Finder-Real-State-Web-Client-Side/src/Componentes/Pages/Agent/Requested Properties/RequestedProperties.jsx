import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestedProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { data: properties = [], refetch } = useQuery({
        queryKey: ['requested'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allRequestedProperties');
            return res.data;
        }
    });

    const handleVerify = async (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Accept this offer from the buyer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept this offer"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/requested/${item._id}`, { offerStatus: 'accepted' });
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Accepted",
                        text: "Offer Accepted",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    };

    const handleReject = async (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Reject this offer from the buyer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject This offer"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/requested/${item._id}`, { offerStatus: 'rejected' });
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Successful",
                        text: "Property is Rejected",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'text-orange-300';
            case 'rejected':
                return 'text-red-500';
            case 'accepted':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };
    // console.log(properties)

    return (
        <div className="lg:mx-36 mt-10">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Property Title</th>
                            <th>Property Location</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Offered Price</th>
                            <th>Offer Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(item => (
                            <tr key={item._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.propertyImage} alt="Property" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.propertyTitle}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.propertyLocation}</td>
                                <td>{item.buyerName}</td>
                                <td>{item.buyerEmail}</td>
                                <td>${item.offeredAmount}</td>
                                <td><span className={getStatusClass(item.offerStatus)}>{item.offerStatus}</span></td>
                                <td>
                                    {item.offerStatus === 'pending' && (
                                        <>
                                            <button className="btn btn-sm bg-green-500 p-2" onClick={() => handleVerify(item)}>Verify</button>
                                            <button className="btn btn-sm bg-red-500 p-2" onClick={() => handleReject(item)}>Reject</button>
                                        </>
                                    )}
                                    {item.offerStatus === 'accepted' && <span className="text-green-500">Accepted</span>}
                                    {item.offerStatus === 'rejected' && <span className="text-red-500">Rejected</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedProperties;
