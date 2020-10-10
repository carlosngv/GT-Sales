-- Insert country if not exists
insert into country(country_name) select 'Costa Rica' from dual
where not exists (select * from country where (country_name = 'Costa Rica'));
select * from country;


-- Insert product category if not exists
insert into product_category(product_category_name) select 'Electrodomestico' from dual
where not exists (select * from product_category where (product_category_name = 'Electrodomestico'));
select * from product_category;
