import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MangeUsers = () => {



    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    // console.log(users)

    // handle make admin
    const handleMakeAdmin = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make admin"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${item._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Sucessfull",
                                text: `${item.name} is admin now`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }
    //handle make agent
    const handleMakeAgent = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Agent"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/agents/${item._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Sucessfull",
                                text: `${item.name} is admin now`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }


    return (
        <div className="lg:mx-36 mt-10">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(item => <>
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.photoURL} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <th>
                                        {
                                            item.role === 'agent' ?
                                                <>
                                                    <p>{item.role}</p>
                                                </>
                                                :
                                                <button className="btn btn-ghost btn-sm" onClick={() => handleMakeAgent(item)}>Make Agent</button>
                                        }
                                    </th>
                                    <th>
                                        {
                                            item.role === 'admin' ?
                                                <>
                                                    <p>{item.role}</p>
                                                </>
                                                :
                                                <button className="btn btn-ghost btn-sm" onClick={() => handleMakeAdmin(item)}>Make Admin</button>
                                        }
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

export default MangeUsers;