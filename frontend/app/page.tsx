'use client';
import { useState, useEffect } from "react";

export default function Home() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then((res) => res.json())
      .then((data) => setStatus(data.status));
  }, []);

  return <div>{status}</div>
}
