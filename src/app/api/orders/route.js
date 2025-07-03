import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'orders.json');

async function getOrders() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(dataFilePath, '[]', 'utf-8');
      return [];
    }
    throw error;
  }
}

async function saveOrders(orders) {
  await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2), 'utf-8');
}

export async function GET() {
  const orders = await getOrders();

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const summary = {
    totalRevenue,
    totalOrders,
    averageOrderValue,
  };

  return NextResponse.json({ orders, summary });
}

export async function POST(request) {
  const newOrder = await request.json();
  const orders = await getOrders();
  
  newOrder.id = new Date().getTime().toString();
  newOrder.createdAt = new Date().toISOString();
  
  orders.push(newOrder);
  await saveOrders(orders);
  
  return NextResponse.json({ message: 'Order created successfully', order: newOrder }, { status: 201 });
}
