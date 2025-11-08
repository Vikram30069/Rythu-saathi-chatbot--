"use client";
import ChatInterface from '@/components/ChatInterface';
import { useState, useEffect } from 'react';

export default function ChatPage() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    let id = localStorage.getItem('rythu_user_id');
    if (!id) {
      id = `user_${Date.now()}`;
      localStorage.setItem('rythu_user_id', id);
    }
    setUserId(id);
  }, []);

  return userId ? <ChatInterface userId={userId} /> : <div>Loading...</div>;
}