import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { api } from "../lib/api";

type Stats = {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
  ordersByStatus: Record<string, number>;
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  created: "bg-blue-100 text-blue-800",
  booked: "bg-cyan-100 text-cyan-800",
  assigned: "bg-indigo-100 text-indigo-800",
  collected: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  returned: "bg-gray-100 text-gray-800",
};

export default function Dashboard() {
  const { data: stats, error } = useQuery({
    queryKey: ["stats"],
    queryFn: () => api.get<Stats>("/admin/stats"),
  });

  if (error)
    return <div className="p-8 text-sm text-red-500">{error.message}</div>;
  if (!stats) return <div className="p-8 text-sm text-gray-400">Loading…</div>;

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      to: "/users",
    },
    {
      label: "Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-green-600",
      bg: "bg-green-50",
      to: "/products",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-purple-600",
      bg: "bg-purple-50",
      to: "/orders",
    },
    {
      label: "Revenue",
      value: `$ ${stats.totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-red-50",
      to: "/orders",
    },
    {
      label: "Low Stock (<5)",
      value: stats.lowStockProducts,
      icon: AlertTriangle,
      color: "text-orange-600",
      bg: "bg-orange-50",
      to: "/stock",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className={`${c.bg} rounded-lg p-2.5 shrink-0`}>
              <c.icon size={20} className={c.color} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 truncate">{c.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">
                {c.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Orders by Status
        </h3>
        {Object.keys(stats.ordersByStatus).length === 0 ? (
          <p className="text-sm text-gray-400">No orders yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.ordersByStatus).map(([status, count]) => (
              <div
                key={status}
                className={`${STATUS_COLORS[status] ?? "bg-gray-100 text-gray-700"} rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1.5`}
              >
                <span className="capitalize">{status}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
