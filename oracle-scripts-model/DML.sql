
ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD';
------------------------ TABLE CREATION ------------------------------------

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
    client_email varchar2(255) not null,
    client_birthday date not null,
    client_profile_picutre varchar2(255),
    client_credits_qty number(10,2) not null,
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
    client_one number,
    client_two number,
    primary key (chat_room_id),
    foreign key (client_one) references clientp(client_id),
    foreign key (client_two) references clientp(client_id)
);

create trigger chat_room_trigger
before insert on chat_room
for each row
begin
  :new.chat_room_id := chat_room_seq.nextval;
end;

-- Chat 
create sequence chat_room_seq START WITH 1 INCREMENT BY 1;

create table chat_room (
    chat_room_id number,
    primary key (chat_room_id)
);

create trigger chat_trigger
before insert on chat_room
for each row
begin
  :new.chat_room_id := chat_room_seq.nextval;
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
    product_photo varchar(255),
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

-- Purchase Detail

create sequence purchase_detail_seq START WITH 1 INCREMENT BY 1;

create table purchase_detail (
    purchase_detail_id number,
    product_id number,
    purchase_id number,
    product_qty number,
    subtotal decimal(10,2),
    primary key(purchase_detail_id),
    foreign key (purchase_id) references purchase(purchase_id),
    foreign key (product_id) references product(product_id)
);

create trigger purchase_detail_trigger
before insert on purchase_detail
for each row
begin
  :new.purchase_detail_id := purchase_detail_seq.nextval;
end;

------------------ PUBLICATION ----------------------------

-- Publication

create sequence publication_seq START WITH 1 INCREMENT BY 1;

create table publication (
    publication_id number,
    product_id number,
    client_id number,
    primary key(publication_id),
    foreign key (client_id) references clientp(client_id),
    foreign key (product_id) references product(product_id)
);

create trigger publication_trigger
before insert on publication
for each row
begin
  :new.publication_id := publication_seq.nextval;
end;


-- Publication detail

create sequence publication_detail_seq START WITH 1 INCREMENT BY 1;

create table publication_detail (
    publication_detail_id number,
    publication_id number,
    likes_qty number,
    dislikes_qty number,
    primary key(publication_detail_id),
    foreign key (publication_id) references publication(publication_id)
);

create trigger publication_detail_trigger
before insert on publication_detail
for each row
begin
  :new.publication_detail_id := publication_detail_seq.nextval;
end;


-- Publication Comment

create sequence publication_comment_seq START WITH 1 INCREMENT BY 1;

create table publication_comment (
    publication_comment_id number,
    publication_comment_content varchar2(255),
    publication_comment_date date,
    client_id number,
    publication_detail_id number,
    primary key(publication_comment_id),
    foreign key (client_id) references clientp(client_id),
    foreign key (publication_detail_id) references publication_detail(publication_detail_id)

);

create trigger publication_comment_trigger
before insert on publication_comment
for each row
begin
  :new.publication_comment_id := publication_comment_seq.nextval;
end;

------------------ COMPLAINTS ----------------------------

-- Complain

create sequence complaint_seq START WITH 1 INCREMENT BY 1;

create table complaint (
    complaint_id number,
    complaint_description varchar2(255),
    complaint_date date,
    complaint_blocked varchar2(10),
    client_id number,
    publication_detail_id number,
    primary key(complaint_id),
    foreign key (client_id) references clientp(client_id),
    foreign key (publication_detail_id) references publication_detail(publication_detail_id)

);

create trigger complaint_trigger
before insert on complaint
for each row
begin
  :new.complaint_id := complaint_seq.nextval;
end;


------------------ ACTIONS (BITACORA) ----------------------------

-- Action

create sequence action_seq START WITH 1 INCREMENT BY 1;

create table action (
    action_id number,
    action_description varchar2(255),
    action_date date,
    client_id number,
    primary key(action_id), 
    foreign key (client_id) references clientp(client_id)
);

create trigger action_trigger
before insert on action
for each row
begin
  :new.action_id := action_seq.nextval;
end;




-- DELETING TABLES ---

drop table clientp;
drop table action;
drop table chat_room;
drop table client_chat_room;
drop table complaint;
drop table country;
drop table message;
drop table product;
drop table product_category;
drop table publication;
drop table publication_comment;
drop table publication_detail;
drop table purchase;
drop table purchase_detail;

drop table chat;















