-- Insert country if not exists
insert into country(country_name) select 'Costa Rica' from dual
where not exists (select * from country where (country_name = 'Costa Rica'));
select * from country;
