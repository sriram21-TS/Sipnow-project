import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tag,
  Users,
  Warehouse,
  Map,
  FolderTree,
  ShoppingBag,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MessageSquare,
  Inbox,
  Ticket,
  BarChart2,
  Gift,
  Store,
  Percent,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/catalogue", icon: FolderTree, label: "Catalogue" },
  { to: "/offers", icon: Tag, label: "General Promotions" },
  { to: "/promotions", icon: Percent, label: "Promotions" },
  { to: "/coupons", icon: Ticket, label: "Coupons" },
  { to: "/gift-cards", icon: Gift, label: "Gift Cards" },
  { to: "/stores", icon: Store, label: "Stores" },
  { to: "/compare", icon: BarChart2, label: "Compare" },
  { to: "/users", icon: Users, label: "Users" },
  { to: "/stock", icon: Warehouse, label: "Stock" },
  { to: "/provider-maps", icon: Map, label: "Suppliers" },
  { to: "/reviews", icon: MessageSquare, label: "Reviews" },
  { to: "/messages", icon: Inbox, label: "Messages" },
];

type Props = { readonly collapsed: boolean; readonly onToggle: () => void };

export default function Sidebar({ collapsed, onToggle }: Props) {
  const { user, logout } = useAuth();

  return (
    <aside
      className={`flex flex-col bg-sidebar h-screen sticky top-0 shrink-0 transition-all duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center h-16 px-4 border-b border-white/10 ${collapsed ? "justify-center" : "gap-2"}`}
      >
        {!collapsed && (
          <span className="font-['Oswald'] font-bold text-white text-sm uppercase tracking-widest leading-tight">
            SipNow
            <br />
            Admin
          </span>
        )}
        {collapsed && (
          <span className="font-['Oswald'] font-bold text-primary text-lg">
            R
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label }) => {
          return (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-white/60 hover:text-white hover:bg-sidebar-hover"
                } ${collapsed ? "justify-center" : ""}`
              }
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User + collapse toggle */}
      <div className="border-t border-white/10">
        {!collapsed && user && (
          <div className="px-4 py-3">
            <p className="text-xs font-semibold text-white truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[10px] text-white/40 capitalize">
              {user.role.replace("_", " ")}
            </p>
          </div>
        )}
        <div
          className={`flex items-center px-2 py-2 gap-1 ${collapsed ? "flex-col" : ""}`}
        >
          <button
            onClick={logout}
            title="Sign out"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-sidebar-hover transition-colors"
          >
            <LogOut size={15} />
          </button>
          <Link
            to="/account"
            title="Account"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-sidebar-hover transition-colors"
          >
            <Settings size={15} />
          </Link>
          <button
            onClick={onToggle}
            title={collapsed ? "Expand" : "Collapse"}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-sidebar-hover transition-colors ml-auto"
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
