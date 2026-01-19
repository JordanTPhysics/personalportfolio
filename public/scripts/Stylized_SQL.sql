SELECT 
    COUNT(order_id)
FROM orders
WHERE order_date BETWEEN '2026-01-01' AND '2026-12-31'
GROUP BY customer_id
ORDER BY COUNT(customer_id) DESC


