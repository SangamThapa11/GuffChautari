import { useSelector } from "react-redux"
import type { RootState } from "../../config/store.config"
import type { UserProfile } from "../../context/AuthContext"

const TopUserDetail = () => {
    const activeUser = useSelector((rootState: RootState) => {
        return rootState?.user?.activeUser as unknown as UserProfile
    })
    return(<>
    <div className="flex items-center gap-3 p-4 bg-blue-950 border-b">
                            <div>
                                <img src={activeUser?.image} alt={activeUser.name} className="w-16 h-16 rounded-full border-2 border-teal-500 object-cover" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">{activeUser.name}</h3>
                                <h3 className="font-semibold text-white">{activeUser.email}</h3>
                                <p className="text-xs text-gray-100">Online</p>
                            </div>
                        </div>

    </>)
}

export default TopUserDetail