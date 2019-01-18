insert into cart_items(customer_id, product_id, quantity) VALUES
($1, $2, 1);

select p.name, p.price, p.image, ci.quantity, ci.id as cart_id, p.id as id from customers c
join cart_items ci
on c.auth0_id = ci.customer_id
join products p
on ci.product_id = p.id 
where c.auth0_id = $3