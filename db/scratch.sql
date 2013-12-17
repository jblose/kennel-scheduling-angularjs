select id, concat(last_name,', ',first_name) as full_name from rsak.client where id > 0
order by concat(last_name,', ',first_name);

/* code for concat rows */
select person_id, group_concat(hobbies separator ', ')
    from peoples_hobbies group by person_id;


select d.id, d.name from rsak.dog d 
join rsak.client_dog_x cdx on (d.id = cdx.dog_id)
where cdx.client_id = 2;


select c.id,c.last_name,c.first_name,c.email,group_concat( d.name separator ', ')  as dognames
from rsak.client c
join rsak.client_dog_x cdx on (c.id = cdx.client_id)
join rsak.dog d on (cdx.dog_id = d.id)
where lower(c.last_name) like lower('%blose%')
order by c.last_name,c.first_name;


select c.id, concat(c.last_name,', ',c.first_name, ' - ', group_concat( d.name separator ', ')) as full_name  
	from rsak.client c
	join rsak.client_dog_x cdx on (c.id = cdx.client_id)
	join rsak.dog d on (cdx.dog_id = d.id)
	where c.id > 0 
	group by c.id
order by concat(c.last_name,', ',c.first_name);



select * from rsak.reservation;

/* insert into rsak.reservation (client_id, dog_id, kennel_id, check_in, check_out, status, title, url, cost, training, training_amt, notes) values ( */
