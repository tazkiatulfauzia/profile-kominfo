import {

LayoutDashboard,

Users, // untuk pelanggan

ShoppingCart, // untuk penjualan

Box, // untuk produk

BarChart2, // untuk laporan

Settings, // untuk pengaturan akun

User,

LogIn,

UserPlus,

} from 'lucide-react'

import { Link, useLocation } from 'react-router-dom'

const menuItems = [

{ name: 'Dashboard', icon: <LayoutDashboard />, path: '/' },

{ name: 'Produk', icon: <Box />, path: '/produk' },

{ name: 'Laporan', icon: <BarChart2 />, path: '/laporan' },

]

const accountItems = [

{ name: 'Pengaturan Akun', icon: <Settings />, path: '/akun' },

{ name: 'Sign In', icon: <LogIn />, path: '/signin' },

{ name: 'Sign Up', icon: <UserPlus />, path: '/signup' },

]