"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import {
  Coffee, ShoppingCart, Plus, Minus, Trash2, Eye, EyeOff,
  CheckCircle, X, Check, IndianRupee, ClipboardList, XCircle, LogOut, MapPin, Phone, Mail, ChevronDown
} from "lucide-react"

<<<<<<< HEAD
=======
//const API_URL = "http://localhost:5000/api/orders"
>>>>>>> 248ef9c (Fix: update Next.js to patched version)
const API_URL = "https://cafe-kitkat-web.onrender.com"

export default function CafeManagementSystem() {
  const [cart, setCart] = useState<any[]>([])
  const [customerName, setCustomerName] = useState("")
  const [orders, setOrders] = useState<any[]>([])
  const [view, setView] = useState<"client" | "server" | "login">("client")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isServerAuthenticated, setIsServerAuthenticated] = useState(false)
  const [showPaymentScanner, setShowPaymentScanner] = useState(false)
  const [showBill, setShowBill] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [loginError, setLoginError] = useState("")
  const [lastOrderCount, setLastOrderCount] = useState<number | null>(null);
  
  // Mobile Tray Control
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  // --- MENU DATA ---
  const menuItems = [
    { id: 1, name: "Pizza + Fries + Cold Drink", price: 149, category: "Cobo offers", image: "https://vps029.manageserver.in/menu/wp-content/uploads/2025/02/images-2025-02-24T161414.465.jpeg" },
    { id: 2, name: "Pizza + Fries", price: 99, category: "Cobo offers", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_PLDQbWZO8djKJHtwIHuLcPyW3XQGnDPQtQ&s" },
    { id: 3, name: "Burger + Fries + Cold Drink", price: 129, category: "Cobo offers", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH9xhVVNhj3aw60U38h8ucyKClzqGY_c2mJQ&s" },
    { id: 4, name: "Burger + Fries", price: 69, category: "Cobo offers", image: "https://yellowplate.ng/wp-content/uploads/2019/09/Burger-loves-fries.jpg" },
    { id: 5, name: "Pizza + Burger + Fries + Cold Drink", price: 199, category: "Cobo offers", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtLAm2981D-uVsOciEepOb4KklSRc7E1hwA&s" },
    { id: 6, name: "Espresso", price: 69, category: "Coffee", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400" },
    { id: 7, name: "Cappuccino", price: 79, category: "Coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400" },
    { id: 8, name: "Latte", price: 99, category: "Coffee", image: "https://www.nescafe.com/in/sites/default/files/2023-04/RecipeHero_CaramelLatte_1066x1066.jpg" },
    { id: 9, name: "Americano", price: 199, category: "Coffee", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400" },
    { id: 10, name: "Mocha", price: 129, category: "Coffee", image: "https://images.unsplash.com/photo-1607681034540-2c46cc71896d?w=400" },
    { id: 11, name: "Cold Coffee", price: 49, category: "Cold Drinks", image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400" },
    { id: 12, name: "Iced tea", price: 79, category: "Cold Drinks", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400" },
    { id: 13, name: "Smoothie", price: 99, category: "Cold Drinks", image: "https://www.eatingwell.com/thmb/TBp6lbiwoYPhRP4N__4sROiUDhA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mixed-berry-breakfast-smoothie-7959466-1x1-e0ad2304222e49508cda7b73b21de921.jpg" },
    { id: 14, name: "Pepsi", price: 29, category: "Cold Drinks", image: "https://www.pepsicopartners.com/medias/300Wx300H-1-HYK-24760.jpg" },
    { id: 15, name: "Mountain Dew", price: 29, category: "Cold Drinks", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyfjerwVfkN_2heIVSDCfU7Bx4USGquMSGcA&s" },
    { id: 16, name: "Mocktail", price: 49, category: "Cold Drinks", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt99vlwslLoDzQiRR7SCrI2yHR3wkuREdNuw&s" },
    { id: 17, name: "Sandwich", price: 79, category: "Food", image: "https://www.watermelon.org/wp-content/uploads/2023/02/Sandwich_2023.jpg" },
    { id: 18, name: "Pizza", price: 99, category: "Food", image: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/26/d112a6d7-d173-4ca7-a5ee-40f845719d18_841144.JPG" },
    { id: 19, name: "Burger", price: 99, category: "Food", image: "https://www.lurch.de/media/b5/4c/70/1693989554/burger-classic-cheese-rezept.jpg" },
    { id: 20, name: "Maggiee", price: 49, category: "Food", image: "https://img-global.cpcdn.com/recipes/da28ecda18072e30/680x781cq80/spicy-veg-maggi-noodles-recipe-main-photo.jpg" },
    { id: 21, name: "Pasta", price: 49, category: "Food", image: "https://www.yummytummyaarthi.com/wp-content/uploads/2022/11/red-sauce-pasta-1-500x500.jpg" },
    { id: 22, name: "Pav Bhaji", price: 79, category: "Food", image: "https://i.pinimg.com/736x/33/9b/b9/339bb9d3758a6078c7f8a7db996b0854.jpg" },
    { id: 23, name: "Misal", price: 79, category: "Food", image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/05/misal-pav.webp" },
    { id: 24, name: "Momos", price: 49, category: "Food", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBFzaWXU-OWg03T-TeaEWoz5GrVWuIvQ7qJw&s" },
    { id: 25, name: "Fries", price: 39, category: "Food", image: "https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg" },
    { id: 26, name: "Kunafa", price: 99, category: "Icecream", image: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/7c0f3eca548f4f96fdfdf0f7aff7e81e" },
    { id: 27, name: "Alphonso Mango", price: 99, category: "Icecream", image: "https://www.ekirana.nl/media/wysiwyg/ekirana/blog-images/Mango-Ice-cream-1x1-closeup-for-blog.jpg" },
    { id: 28, name: "Salted Dark Chocolate", price: 99, category: "Icecream", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9e_UQ7fqrG0dW-djFepowLOprvf5rlb4U_A&s" },
    { id: 29, name: "Paan(Betel Leaf)", price: 99, category: "Icecream", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXYX0pKOOKHy9d0yM3bYdAToi91oslxar-qg&s" },
    { id: 30, name: "Vanilla", price: 49, category: "Icecream", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAJHDPJyup_XApnIEGYKRPU0zk_0d9RTRixA&s" },
    { id: 31, name: "Strawberry", price: 49, category: "Icecream", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdExA7qsPmcOaiiRmA0Hhjmx4fD1JLIM1DIA&s" },
    { id: 32, name: "Pistachio", price: 49, category: "Icecream", image: "https://thesaltedpepper.com/wp-content/uploads/2020/09/pistachio-ice-cream-sq.jpg" },
    { id: 33, name: "Sitafal", price: 99, category: "Icecream", image: "https://www.bbassets.com/media/uploads/p/l/800446635_1-eat-o-gito-naturals-ice-cream-sitaphal-suger-free.jpg" },
  ];

  const categories = Array.from(new Set(menuItems.map(i => i.category)));
  const toDateKey = (ts: string | Date) => new Date(ts).toLocaleDateString("en-CA");

  const stats = useMemo(() => {
    const filtered = orders.filter(o => toDateKey(o.createdAt) === selectedDate);
    return {
      total: filtered.length,
      completed: filtered.filter(o => o.status === 'completed').length,
      cancelled: filtered.filter(o => o.status === 'cancelled').length,
      profit: filtered.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0)
    };
  }, [orders, selectedDate]);

  const calculateTotal = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 🔊 AUDIO LOGIC
  const playSound = (path: string) => {
    const audio = new Audio(path);
    audio.volume = 1.0; 
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => console.warn("Audio blocked. Click to enable."));
    }
  };

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Fetch error");
      const data = await res.json();
      if (lastOrderCount !== null && data.length > lastOrderCount) {
        if (view === "server" && isServerAuthenticated) {
          playSound("/sounds/new-order.mp3");
        }
      }
      setLastOrderCount(data.length);
      setOrders(data);
    } catch (err) {
      console.error("Fetch error");
    }
  }, [lastOrderCount, view, isServerAuthenticated]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleServerLogin = () => {
    if (username === "kitkat" && password === "Palus@123") {
      setIsServerAuthenticated(true);
      localStorage.setItem("serverAuth", "true");
      setView("server");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("serverAuth");
    setIsServerAuthenticated(false);
    setView("client");
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const handleCheckout = (method: "cash" | "online") => {
    if (!customerName.trim()) return alert("Please enter your name.");
    if (cart.length === 0) return alert("Tray is empty.");
    if (method === "online") setShowPaymentScanner(true);
    else completeOrder("cash");
  };

  const completeOrder = async (method: "cash" | "online") => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          items: cart,
          total: calculateTotal(),
          paymentMethod: method,
          status: "pending",
        }),
      });

      if (res.ok) {
        playSound("/sounds/order-placed.mp3");
        setShowPaymentScanner(false);
        setIsMobileCartOpen(false); 
        setShowBill(true);
        fetchOrders();
      }
    } catch (err) {
      alert("Order failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col font-sans">
      {/* NAVBAR */}
      <nav className="bg-[#1e293b]/80 backdrop-blur-md border-b border-emerald-500/20 p-4 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView("client")}>
            <div className="p-2 bg-emerald-500 rounded-lg group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all">
              <Coffee size={24} className="text-[#0f172a]" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white">KITKAT <span className="text-emerald-400">CAFE</span></h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hidden md:block text-xs font-bold uppercase tracking-widest hover:text-emerald-400 transition">Contact Us</a>
            {isServerAuthenticated ? (
              <button onClick={() => setView(view === "server" ? "client" : "server")} className="bg-emerald-500 hover:bg-emerald-400 text-[#0f172a] px-5 py-2 rounded-full text-xs font-black uppercase transition-all">
                {view === "server" ? "View Menu" : "Dashboard"}
              </button>
            ) : (
              <button onClick={() => setView("login")} className="border border-emerald-500/50 text-emerald-400 px-5 py-2 rounded-full text-xs font-black uppercase hover:bg-emerald-500/10 transition-all">Staff Login</button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* LOGIN VIEW */}
        {view === "login" && (
          <div className="flex items-center justify-center pt-24 px-4">
            <div className="bg-[#1e293b] p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-slate-700/50">
              <h2 className="text-2xl font-black text-center mb-8 text-white uppercase tracking-tight">Staff Portal</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Username" className="w-full p-4 bg-[#0f172a] border border-slate-700 rounded-2xl outline-none text-white" onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full p-4 bg-[#0f172a] border border-slate-700 rounded-2xl outline-none text-white" onChange={e => setPassword(e.target.value)} />
                {loginError && <p className="text-red-400 text-xs font-bold">{loginError}</p>}
                <button onClick={handleServerLogin} className="w-full bg-emerald-500 text-[#0f172a] py-4 rounded-2xl font-black uppercase shadow-lg shadow-emerald-500/20">Sign In</button>
                <button onClick={() => setView("client")} className="w-full text-slate-500 text-xs font-bold uppercase">Back</button>
              </div>
            </div>
          </div>
        )}

        {/* CLIENT MENU VIEW */}
        {view === "client" && !showBill && !showPaymentScanner && (
          <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
              {categories.map(cat => (
                <div key={cat}>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">{cat}</h2>
                    <div className="h-[2px] flex-grow bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {menuItems.filter(i => i.category === cat).map(item => (
                      <div key={item.id} className="bg-[#1e293b] p-4 rounded-3xl border border-slate-700/50 flex gap-4 items-center group hover:border-emerald-500/30 transition-all">
                        <div className="relative overflow-hidden rounded-2xl w-24 h-24 shrink-0">
                          <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg leading-tight">{item.name}</h3>
                          <p className="text-emerald-400 font-black text-xl mt-1">₹{item.price}</p>
                          <button
                            onClick={() => {
                              const exists = cart.find(i => i.id === item.id);
                              if (exists) setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
                              else setCart([...cart, { ...item, qty: 1 }]);
                            }}
                            className="text-[10px] bg-slate-800 text-white font-black uppercase tracking-widest px-4 py-2 rounded-full mt-3 hover:bg-emerald-500 hover:text-[#0f172a] transition-all border border-slate-700"
                          >
                            + Add Item
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* SIDEBAR TRAY (DESKTOP & MOBILE OVERLAY) */}
            <>
              {/* Overlay Background for Mobile */}
              {isMobileCartOpen && (
                <div 
                  className="fixed inset-0 bg-[#000]/60 backdrop-blur-sm z-[55] lg:hidden transition-opacity"
                  onClick={() => setIsMobileCartOpen(false)}
                ></div>
              )}

              <div className={`
                bg-[#1e293b] p-6 rounded-[2rem] shadow-2xl h-fit border border-slate-700/50
                ${isMobileCartOpen ? 
                  'fixed bottom-0 left-0 right-0 z-[60] lg:relative rounded-t-[2.5rem] rounded-b-none max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]' : 
                  'hidden lg:block lg:sticky lg:top-28'}
              `}>
                {/* Mobile Handle Bar */}
                {isMobileCartOpen && (
                  <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-6 lg:hidden"></div>
                )}
                
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-black text-xl flex items-center gap-2 text-white italic"><ShoppingCart className="text-emerald-400" /> MY TRAY</h2>
                  <button onClick={() => isMobileCartOpen && setIsMobileCartOpen(false)} className="lg:hidden text-slate-500"><ChevronDown /></button>
                </div>

                <div className="mb-6">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Guest Name</label>
                  <input type="text" placeholder="Enter name..." className="w-full mt-2 p-4 bg-[#0f172a] border border-slate-700 rounded-2xl focus:ring-1 focus:ring-emerald-500 outline-none text-white" value={customerName} onChange={e => setCustomerName(e.target.value)} />
                </div>

                <div className="space-y-4 max-h-[300px] lg:max-h-[400px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                  {cart.length === 0 ? (
                    <div className="text-center py-10 opacity-20"><Coffee size={48} className="mx-auto mb-2" /><p className="text-sm font-bold">TRAY IS EMPTY</p></div>
                  ) : cart.map(i => (
                    <div key={i.id} className="flex justify-between items-center bg-[#0f172a]/50 p-3 rounded-2xl border border-slate-800">
                      <div>
                        <p className="font-bold text-sm text-slate-200">{i.name}</p>
                        <p className="text-xs text-emerald-400 font-bold">₹{i.price}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-[#1e293b] p-1 rounded-xl border border-slate-700">
                        <button onClick={() => setCart(cart.map(item => item.id === i.id ? { ...item, qty: Math.max(0, item.qty - 1) } : item).filter(item => item.qty > 0))} className="p-1.5 text-slate-400 hover:text-red-400 transition-all"><Minus size={12} /></button>
                        <span className="font-black text-xs min-w-[12px] text-center text-white">{i.qty}</span>
                        <button onClick={() => setCart(cart.map(item => item.id === i.id ? { ...item, qty: item.qty + 1 } : item))} className="p-1.5 text-slate-400 hover:text-emerald-400 transition-all"><Plus size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-700/50 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-tighter">Total Payable</span>
                    <span className="text-3xl font-black text-white">₹{calculateTotal()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleCheckout("online")} className="bg-emerald-500 text-[#0f172a] py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-500/20">Online UPI</button>
                    <button onClick={() => handleCheckout("cash")} className="bg-slate-800 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-slate-700">Pay Cash</button>
                  </div>
                </div>
              </div>
            </>
          </div>
        )}

        {/* DASHBOARD VIEW */}
        {view === "server" && isServerAuthenticated && (
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-white italic tracking-tighter">ORDER TERMINAL</h2>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/10 text-red-400 px-5 py-2 rounded-full font-black uppercase text-[10px] hover:bg-red-500 hover:text-white transition-all">
                <LogOut size={14} /> Exit
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 shadow-xl">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Total</p>
                <p className="text-4xl font-black text-white leading-none">{stats.total}</p>
              </div>
              <div className="bg-[#1e293b] p-6 rounded-3xl border border-emerald-500/30 shadow-xl">
                <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-2">Completed</p>
                <p className="text-4xl font-black text-emerald-400 leading-none">{stats.completed}</p>
              </div>
              <div className="bg-[#1e293b] p-6 rounded-3xl border border-red-500/30 shadow-xl">
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-2">Failed</p>
                <p className="text-4xl font-black text-red-400 leading-none">{stats.cancelled}</p>
              </div>
              <div className="bg-emerald-500 p-6 rounded-3xl shadow-lg">
                <p className="text-[#0f172a]/60 text-[10px] font-black uppercase tracking-widest mb-2">Profit</p>
                <p className="text-4xl font-black text-[#0f172a] leading-none">₹{stats.profit}</p>
              </div>
            </div>
            {/* Orders list continues... (Same as your previous server logic) */}
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4 items-center">
              <h3 className="text-xl font-black text-white uppercase italic">Live Orders</h3>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="p-3 bg-[#1e293b] border border-slate-700 rounded-xl font-bold text-white outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div className="space-y-4">
              {orders.filter(o => toDateKey(o.createdAt) === selectedDate).length === 0 ?
                <div className="text-center py-24 bg-[#1e293b]/50 rounded-[3rem] text-slate-600 font-black italic border border-dashed border-slate-800">NO ORDERS</div> :
                orders.filter(o => toDateKey(o.createdAt) === selectedDate).reverse().map(order => (
                  <div key={order._id} className="bg-[#1e293b] p-6 rounded-[2rem] border border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-emerald-500/30 transition-all">
                    <div className="flex-1 w-full">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">ID: {order._id.slice(-6)} • <span className="text-emerald-500">{order.paymentMethod}</span></p>
                      <h4 className="text-xl font-black text-white">{order.customerName}</h4>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {order.items.map((it: any) => <span key={it.id} className="text-[9px] font-black bg-[#0f172a] text-slate-400 px-3 py-1.5 rounded-lg uppercase border border-slate-800">{it.name} x{it.qty}</span>)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full md:w-auto md:gap-8 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                      <p className="text-3xl font-black text-white">₹{order.total}</p>
                      {order.status === 'pending' ? (
                        <div className="flex gap-3">
                          <button onClick={() => updateOrderStatus(order._id, 'completed')} className="w-12 h-12 flex items-center justify-center bg-emerald-500/10 text-emerald-500 rounded-2xl hover:bg-emerald-500 transition-all border border-emerald-500/20"><Check size={20}/></button>
                          <button onClick={() => updateOrderStatus(order._id, 'cancelled')} className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 transition-all border border-red-500/20"><X size={20}/></button>
                        </div>
                      ) : (
                        <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                          {order.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </main>

      {/* STICKY BOTTOM BAR (Always Small & Compact) */}
      {view === "client" && cart.length > 0 && !isMobileCartOpen && !showBill && !showPaymentScanner && (
        <div className="lg:hidden fixed bottom-6 left-4 right-4 z-[50]">
          <button 
            onClick={() => setIsMobileCartOpen(true)}
            className="w-full bg-[#10b981] text-[#0f172a] p-4 rounded-2xl font-black flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.4)] border-2 border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#0f172a] text-emerald-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </div>
              <span className="uppercase tracking-widest text-xs">View Tray</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">₹{calculateTotal()}</span>
              <ShoppingCart size={18} />
            </div>
          </button>
        </div>
      )}

      {/* FOOTER & OVERLAYS (QR & BILL - SAME AS PREVIOUS) */}
      <footer id="contact" className="bg-[#0a0f1d] py-16 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-white text-4xl font-black italic">GET IN TOUCH</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-emerald-400"><MapPin size={24} /></div>
                <div>
                  <p className="font-black text-white text-sm mb-1 italic">LOCATION</p>
                  <p className="text-slate-500 text-sm leading-relaxed">Karad Tasgaon Road, Palus</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden border border-slate-800 relative h-[200px]">
             <div className="absolute inset-0 bg-emerald-500/10 z-10 pointer-events-none"></div>
             <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
               <MapPin className="text-emerald-600 mb-2" size={32} />
               <p className="text-white text-[10px] font-black uppercase tracking-widest">Palus, Maharashtra</p>
             </div>
          </div>
        </div>
      </footer>

      {/* PAYMENT SCANNER */}
      {showPaymentScanner && (
        <div className="fixed inset-0 bg-[#0f172a]/95 backdrop-blur-xl flex items-center justify-center p-6 z-[100]">
          <div className="bg-[#1e293b] p-8 rounded-[3rem] text-center max-w-sm w-full border border-slate-700">
            <h2 className="text-xl font-black mb-6 text-white uppercase italic">Scan to Pay</h2>
            <div className="bg-white p-6 rounded-3xl mb-8 flex items-center justify-center">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=kitkat@upi&pn=KitKatCafe&am=${calculateTotal()}`} className="w-48 h-48" alt="QR" />
            </div>
            <p className="text-3xl font-black text-emerald-400 mb-8">₹{calculateTotal()}</p>
            <button onClick={() => completeOrder("online")} className="w-full bg-emerald-500 text-[#0f172a] py-5 rounded-2xl font-black uppercase">Paid Successfully</button>
            <button onClick={() => setShowPaymentScanner(false)} className="mt-4 text-slate-500 text-xs font-bold uppercase">Cancel</button>
          </div>
        </div>
      )}

      {/* BILL CONFIRMATION */}
      {showBill && (
        <div className="fixed inset-0 bg-emerald-500 flex items-center justify-center p-6 z-[100]">
          <div className="bg-[#0f172a] p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center border border-emerald-400/20">
            <CheckCircle size={48} className="text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-white uppercase italic mb-2">Confirmed!</h2>
            <p className="text-slate-400 mb-10 text-sm">Deliciousness is on its way, {customerName}!</p>
            <button onClick={() => { setShowBill(false); setCart([]); setCustomerName(""); }} className="w-full bg-emerald-500 text-[#0f172a] py-5 rounded-2xl font-black uppercase">Awesome</button>
          </div>
        </div>
      )}
    </div>
  )
}
