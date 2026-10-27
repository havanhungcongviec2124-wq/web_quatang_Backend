const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Họ tên là bắt buộc'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email là bắt buộc'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Mật khẩu là bắt buộc'],
            minlength: [6, 'Mật khẩu tối thiểu 6 ký tự'],
        },
        phone: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer',
        },
        membership: {
            type: String,
            default: 'HỘI VIÊN LUXE GOLD',
        },
        avatar: {
            type: String,
            default: '',
        },
        address: {
            province: { type: String, default: '' },
            district: { type: String, default: '' },
            ward: { type: String, default: '' },
            detail: { type: String, default: '' },
        },
        addresses: [
            {
                fullName: { type: String, default: '' },
                phone: { type: String, default: '' },
                province: { type: String, default: '' },
                district: { type: String, default: '' },
                ward: { type: String, default: '' },
                detail: { type: String, default: '' },
                isDefault: { type: Boolean, default: false },
                label: { type: String, default: 'Nhà riêng' },
            },
        ],
    },
    {
        timestamps: true,
    }
);
exports.userSchema = userSchema;
