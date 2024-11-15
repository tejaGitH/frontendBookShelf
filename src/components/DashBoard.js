import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends, fetchPendingRequests } from "../actions/friendshipActions";

const Dashboard =()=>{
    const dispatch = useDispatch();
    const {friends, pendingRequests, loading} = useSelector((state)=> state.friendship);

    useEffect(()=>{
        dispatch(fetchFriends());
        dispatch(fetchPendingRequests());
    },[dispatch]);

    return(
         <div>
            <h2>Dashboard</h2>
            {loading && <p>Loading...</p>}
            <section>
                <h3>Currently Reading</h3>
                {/* Map over the user's currently reading books */}
            </section>
            <section>
                <h3>Friend Activity</h3>
                {friends.map((friend) => (
                    <p key={friend.id}>{friend.name} is currently reading...</p>
                ))}
            </section>
            <section>
                <h3>Pending Friend Requests</h3>
                {pendingRequests.map((request) => (
                    <p key={request.id}>{request.name} sent a friend request.</p>
                ))}
            </section>
        </div>
    )
}

export default Dashboard;