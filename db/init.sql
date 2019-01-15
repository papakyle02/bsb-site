create table if not exists customers(
    id serial unique,
    name varchar(255) not null,
    email varchar(255) not null,
    image text,
    auth0_id text
);

create table if not exists products(
    id serial unique,
    name varchar(255),
    price int,
    image text
);

create table if not exists purchases(
    id serial unique,
    customer_id int references customers(id)
);

create table if not exists cart_items(
    id serial primary key,
    customer_id text,
    product_id int references products(id),
    quantity int
);

create table if not exists ratings(
    id serial,
    product_id int,
    customer_id text,
    rating int,
)

insert into products(name, price, image) values
('Black Gloves', 30, 'https://images-na.ssl-images-amazon.com/images/I/81PK48VZqML._SL1500_.jpg'),
('White Gloves', 32, 'https://images-na.ssl-images-amazon.com/images/I/81cmsKMrFJL._SL1500_.jpg'),
('Blue Gloves', 35, 'https://images-na.ssl-images-amazon.com/images/I/811mcos2CTL._SL1500_.jpg');