select id, concat(last_name,', ',first_name) as full_name from rsak.client where id > 0
order by concat(last_name,', ',first_name);

/* code for concat rows */
select person_id, group_concat(hobbies separator ', ')
    from peoples_hobbies group by person_id;


select d.id, d.name from rsak.dog d 
join rsak.client_dog_x cdx on (d.id = cdx.dog_id)
where cdx.client_id = 2;
