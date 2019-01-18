update cart_items
set quantity = $1
where id = $2;

select p.name, p.price, p.image, ci.quantity, ci.id as cart_id, p.id as id from customers c
join cart_items ci
on c.auth0_id = ci.customer_id
join products p
on ci.product_id = p.id 
where c.auth0_id = $3