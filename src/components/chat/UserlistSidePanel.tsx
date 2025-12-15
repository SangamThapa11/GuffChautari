import { Avatar, List } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../config/store.config";
import type { UserProfile } from "../../context/AuthContext";
import { setActiveUser } from "../../reducer/User.reducer";

const UserListSidePanel = () => {
    const userList = useSelector((rootState: RootState) => {
        return {
            list: rootState?.user?.allUserList,
            pagination: rootState?.user?.userListPagination
        }
    })
    const dispatch = useDispatch<AppDispatch>()

    const listItemClickHandle = (user: UserProfile) => {
        dispatch(setActiveUser(user))
    }
    return (<>
        <div className="w-1/5  flex flex-col bg-linear-to-t from-sky-500 to-indigo-500">
            <div className="h-20 w-full bg-blue-950 text-white font-extrabold font-serif text-3xl flex items-center justify-center border-b border-b-teal-400">
                <h1>Chat List</h1>
            </div>
            <div className="h-full overflow-y-scroll px-1 rounded-lg">
                {
                    userList && userList.list ? <>
                        <List dataSource={userList?.list}
                            renderItem={(user: UserProfile) => {
                                return (
                                    <List.Item key={user._id} onClick={() => {listItemClickHandle(user)}}>
                                        <List.Item.Meta
                                            avatar={<Avatar className="w-15! h-15!" src={user.image} />}
                                            title={user.name}
                                            className="shadow-lg hover:cursor-pointer transition hover:scale-97 p-2 bg-linear-65 from-purple-500 to-pink-500"
                                            description={<>
                                                <p className="truncate text-slate-900">{user.email}</p>
                                                <span className="text-xs font-extralight italic text-white">{user.role}</span>
                                            </>}
                                        />
                                    </List.Item>
                                )
                            }}
                        >

                        </List>
                    </> : <></>
                }
            </div>
        </div>
    </>)
}
export default UserListSidePanel