import type { ItemType } from "antd/es/menu/interface";
import { AiFillDatabase, AiOutlineCoffee, AiOutlineDesktop, AiOutlineDollar, AiOutlineMessage, AiOutlineShopping, AiOutlineUser, AiTwotoneSwitcher } from "react-icons/ai";
import  { NavLink } from "react-router";

export const AdminMenu: ItemType[] = [
                    {
                        key: "dashboard",
                        title: "Dashboard",
                        label: <NavLink to="/admin">Dashboard</NavLink>,
                        icon: <AiOutlineDesktop />
                    },
                    {
                        key: "banners",
                        title: "Banners",
                        label: "Banners",
                        icon: <AiTwotoneSwitcher />
                    },
                    {
                        key: "menu",
                        title: "Menu",
                        label: "Menu",
                        icon: <AiFillDatabase />
                    },
                    {
                        key: "food",
                        title: "Food Items",
                        label: "Food Items",
                        icon: <AiOutlineCoffee />
                    },
                    {
                        key: "orders",
                        title: "Orders",
                        label: "Orders",
                        icon: <AiOutlineShopping />
                    },
                    {
                        key: "transactions",
                        title: "Transactions",
                        label: "Transactions",
                        icon: <AiOutlineDollar />
                    },
                    {
                        key: "cutomers",
                        title: "Customers",
                        label: "Customers",
                        icon: <AiOutlineUser />
                    },
                    {
                        key: "chat",
                        title: "Messages",
                        label: <NavLink to='/admin/chat'>Messages</NavLink>,
                        icon: <AiOutlineMessage />
                    }
                ]

export const CustomerMenu: ItemType[] = [
                    {
                        key: "menu",
                        title: "Menu",
                        label: <NavLink to="/customer">Menu</NavLink>,
                        icon: <AiOutlineDesktop />
                    },
                   
                    
                    
                    {
                        key: "chat",
                        title: "Messages",
                        label: <NavLink to='/customer/chat'>Messages</NavLink>,
                        icon: <AiOutlineMessage />
                    }
                ]

