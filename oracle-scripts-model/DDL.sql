-- Insert country if not exists
insert into country(country_name) select 'Costa Rica' from dual
where not exists (select * from country where (country_name = 'Costa Rica'));
select * from country;

-- CRUD Actions


ALTER TABLE clientp 
ADD verified varchar2(20);

ALTER TABLE product 
MODIFY product_unit_price Number(10,2);

alter table complaint
modify complaint_date timestamp default sysdate;

alter table complaint
add publication_id number;

alter table message add message_date timestamp default sysdate;

insert into clientp (client_name, client_lastname, client_username, client_password, client_email, client_birthday,
      client_profile_picutre, client_credits_qty, client_country) 
    SELECT 'Guillermo', 'Joba', 'guilli', '1234', 'joba@hotmail.com', '30 OCT 1998',
      'uploads/2020-10-10T08:06:20.906Zlogo_usac.png', '10000', country.country_id FROM country where country_name = 'Australia';

select client_name, client_lastname, client_username, client_password, client_email, client_birthday,
      client_profile_picutre, client_credits_qty, country.country_name from clientp inner join country on country_id = 2 and client_id=2;

update clientp
set client_name = 'Ana', 
    client_lastname= 'Rodas',
    client_username= 'ana99',
    client_password= '12345',
    client_email= 'ana99@hotmail.com',
    client_birthday= '03 JAN 1999',
    client_country = (select country_id from country where country_name = 'Australia')
    where client_id= '4';
    
    
    
select * from clientp;
      
      
      
-- PRODUCT ACTIONS

-- Insert product category if not exists
insert into product_category(product_category_name) select 'Electrodomestico' from dual
where not exists (select * from product_category where (product_category_name = 'Electrodomestico'));




insert into product (product_name, product_detail, product_unit_price, product_category)
    SELECT 'Apio', 'Recién cosechado, freso', 3.99, product_category.product_category_id FROM product_category where product_category_name = 'Vegetales';



select * from product;

select * from product_category;

ALTER TABLE product 
ADD product_photo varchar2(255);

truncate table product_category;

truncate table product;

alter table clientp modify (
    client_credits_qty NUMBER(10,2)
);


update product set
        product_name = :product_name,
        product_detail = :product_detail,
        product_unit_price = :product_unit_price,
        product_category = (select product_category_id from product_category where product_category_name = :product_category),
        product_photo = :path
         where product_id = :product_id;


------ PUBLICATIONS

select p.product_id, p.product_name, p.product_detail, p.product_unit_price, p.product_photo, pc.product_category_name from product p
inner join product_category pc on p.product_category = pc.product_category_id and
p.product_name='Papas';




select pub.publication_id, pub.product_id, pub.client_id, c.client_name, p.product_name, p.product_detail,
p.product_unit_price from publication pub 
join clientp c on c.client_id >0
join product p on pub.product_id = p.product_id where pub.publication_id = 3;

select pub.publication_id, pub.product_id, pub.client_id, c.client_name, p.product_name from publication pub 
join clientp c on c.client_id = pub.client_id;

select publication_id from publication where client_id = 101 and product_id = 35;

select * from publication_detail where publication_id = 3;

insert into publication_detail (publication_id, likes_qty, dislikes_qty) values(5, 0, 0);

update publication_detail set likes_qty = 10, dislikes_qty=1 where publication_id=3;


ALTER TABLE publication_comment 
MODIFY publication_comment_date default sysdate not null;

select * from publication_detail;

insert into publication_comment (publication_comment_content, client_id
, publication_detail_id) values ('Muy buen producto, recomendado!', 121, 1); 


select * from publication_comment;
select * from publication_comment where publication_detail_id=2;

select c.client_name, c.client_lastname, pc.publication_comment_content, pc.publication_comment_date, pc.publication_detail_id 
from clientp c, publication_comment pc where pc.client_id = c.client_id and pc.publication_detail_id = 2;


-- CHAT ---

insert into chat (client_one, client_two, chat_message) values (101, 121, 'jajajaja');

select * from chat;

select ch.client_one, c1.client_name, ch.client_two, c2.client_name, ch.chat_message from
chat ch, clientp c1, clientp c2 where c1.client_id = 101 and c2.client_id = 121

select ch.client_one, c1.client_name, ch.client_two, c2.client_name, ch.chat_message from
chat ch, clientp c1, clientp c2 where ch.client_one = c1.client_id and ch.client_two = c2.client_id;



insert into chat_room (client_one, client_two) values (101, 121);

select * from chat_room;

insert into message (message_content, client_id, chat_room_id) 
values('Hola Carlos', 121, 1);

select * from message;

select m.chat_room_id, m.message_content, m.client_id, c.client_name, c.client_lastname,m.message_date   
    from message m, clientp c where m.chat_room_id = 1 and c.client_id = m.client_id;
    
insert into chat_room(client_one, client_two) select 101, 141 from dual
where not exists (select * from chat_room where (client_one = 101 and client_two = 141) or(client_one = 141 and client_two = 101));
select * from chat_room;

select * from clientp;


-- Complaints

select * from publication_detail;

alter table publication_detail add blocked varchar(20) default 'false';


insert into complaint (complaint_description, client_id, publication_id) values('MUY MAL PRODUCTO, NO RECOMENDADO!!!', 121, 41);

select * from complaint;

select co.complaint_id, c.client_id, c.client_name, c.client_lastname, 
co.complaint_description, pub.product_id, p.product_name
from complaint co, publication pub, clientp c, product p 
where co.client_id = c.client_id 
and co.publication_id = pub.publication_id 
and p.product_id = pub.product_id;

select * from product;

select * from clientp;

