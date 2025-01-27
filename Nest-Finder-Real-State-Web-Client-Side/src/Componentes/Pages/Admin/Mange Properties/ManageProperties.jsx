import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageProperties = () => {

    const axiosSecure = useAxiosSecure();
    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allProperties')
            return res.data
        }
    })

    //verify property
    const handleVerify = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "Verify this property from the agent!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Verify This Property"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/properties/${item._id}`, { status: 'verified' }) // Send the status in the request body
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Successful",
                                text: "Property Verified Successfully",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    }

    //reject property
    const handleReject = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "Reject this property from the agent!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject This Property"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/properties/${item._id}`, { status: 'rejected' }) // Send the status in the request body
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Successful",
                                text: "Property is Rejected",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    }

    console.log(properties)
    return (
        <div className="lg:mx-36 mt-10">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Property Title</th>
                            <th>Property Location</th>
                            <th>Agent Name</th>
                            <th>Agent Email</th>
                            <th>Price Range</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            properties.map(item => <>
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.propertyImage} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.propertyTitle}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.propertyLocation}
                                    </td>
                                    <th>
                                        <td>
                                            {
                                                item.agentName
                                            }
                                        </td>
                                    </th>
                                    <th>
                                        <td>{item.agentEmail}</td>
                                    </th>
                                    <th>
                                        <td>${item.priceRange}</td>
                                    </th>
                                    <th>
                                        <td>{item.status}</td>
                                    </th>
                                    <th>
                                        <td>
                                            {item.status === 'pending' && (
                                                <>
                                                    <button className="btn btn-sm bg-green-500 p-2" onClick={() => handleVerify(item)}>Verify</button>
                                                    <button className="btn btn-sm bg-red-500 p-2" onClick={() => handleReject(item)}>Reject</button>
                                                </>
                                            )}
                                            {item.status === 'verified' && <span className="text-green-500">Verified</span>}
                                            {item.status === 'rejected' && <span className="text-red-500">Rejected</span>}
                                        </td>
                                    </th>
                                </tr>
                            </>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperties;