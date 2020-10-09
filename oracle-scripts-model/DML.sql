-- Country creation --
create sequence country_seq START WITH 1 INCREMENT BY 1;

create table country(
    country_id number,
    country_name varchar2(50) not null,
    primary key(country_id)
);

create trigger country_trigger
before insert on country
for each row
begin
  :new.country_id := country_seq.nextval;
end;


-- Client creation --
create sequence client_seq START WITH 1 INCREMENT BY 1;

create table clientp (
    client_id number,
    client_name varchar2(20) not null,
    client_lastname varchar2(20) not null,
    client_username varchar2(20) not null,
    client_password varchar2(100) not null,
    client_email varchar2(20) not null,
    client_birthday date not null,
    client_profile_picutre varchar2(255),
    client_credits_qty number not null,
    client_country  number,
    primary key(client_id),
    foreign key (client_country) references country(country_id)
);

create trigger client_trigger
before insert on clientp
for each row
begin
  :new.client_id := client_seq.nextval;
end;
-------------------.---- CHAT ------------------------------------

-- Chat room
create sequence chat_room_seq START WITH 1 INCREMENT BY 1;

create table chat_room (
    chat_room_id number,
    chat_room_description varchar2(125),
    primary key (chat_room_id)
);

create trigger chat_room_trigger
before insert on chat_room
for each row
begin
  :new.chat_room_id := chat_room_seq.nextval;
end;


-- Client chat room
create sequence cc_room_seq START WITH 1 INCREMENT BY 1;

create table client_chat_room (
    client_chat_room_id number,
    client_id number,
    chat_room number,
    primary key (client_chat_room_id),
    foreign key (client_id) references clientp(client_id),
    foreign key (chat_room) references chat_room(chat_room_id)
);

create trigger client_chat_room_trigger
before insert on client_chat_room
for each row
begin
  :new.client_chat_room_id := cc_room_seq.nextval;
end;


-- Chat Messages
create sequence message_seq START WITH 1 INCREMENT BY 1;

create table message(
    message_id number,
    message_content varchar2(255),
    client_id number,
    chat_room_id number,
    primary key(message_id),
    foreign key (client_id) references clientp(client_id),
    foreign key (chat_room_id) references chat_room(chat_room_id)
);

create trigger message_trigger
before insert on message
for each row
begin
  :new.message_id := message_seq.nextval;
end;

----------------------- PRODUCT ------------------------------------

-- Product category
create sequence product_category_seq START WITH 1 INCREMENT BY 1;

create table product_category (
    product_category_id number,
    product_category_name varchar2(60),
    primary key(product_category_id)
);

create trigger product_category_trigger
before insert on product_category
for each row
begin
  :new.product_category_id := product_category_seq.nextval;
end;


-- Product

create sequence product_seq START WITH 1 INCREMENT BY 1;

create table product (
    product_id number,
    product_name varchar2(60),
    product_detail varchar2(60),
    product_unit_price decimal(5,2),
    product_category number,
    primary key(product_id),
    foreign key (product_category) references product_category(product_category_id)
);

create trigger product_trigger
before insert on product
for each row
begin
  :new.product_id := product_seq.nextval;
end;


-- Purchase

create sequence purchase_seq START WITH 1 INCREMENT BY 1;

create table purchase (
    purchase_id number,
    client_id number,
    purchase_total decimal(10,2),
    primary key(purchase_id),
    foreign key (client_id) references clientp(client_id)
);

create trigger purchase_trigger
before insert on purchase
for each row
begin
  :new.purchase_id := purchase_seq.nextval;
end;



