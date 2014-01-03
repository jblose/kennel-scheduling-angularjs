select max(master_id)+1 as masterReservationId from rsak.reservation_id_x;


select ifnull(reservation_id,0) as id,ifnull(title,'Vacant') as title,ifnull(url,'null') as url ,ifnull(status,'event-inverse') as class, ifnull(check_in,(1368723600 *1000)) as start, ifnull(check_out,(1400259600*1000)) as end 
            from rsak.kennel k 
            join rsak.reservation r on (k.kennel_id = r.kennel_id) 
            where k.size = 'large';


select reservation_Id as id, title as title from  rsak.kennel k
join rsak.reservation r on (k.kennel_id = r.kennel_id) 
where k.size = 'large';


select ifnull(reservation_id,0) as id,ifnull(title,'') as title,ifnull(url,'null') as url ,ifnull(status,'event-inverse') as class, ifnull(check_in,(1368723600 *1000)) as start, ifnull(check_out,(1400259600*1000)) as end 
from rsak.kennel k 
left join rsak.reservation r on (k.kennel_id = r.kennel_id) 
where k.size = 'large'

select reservation_Id as id, title as title from  rsak.kennel k
join rsak.reservation r on (k.kennel_id = r.kennel_id) 
where k.size = 'large'






select from_unixtime((1357016400000+(3600000*2))/1000);

select from_unixtime((1357016400000)/1000);

/*
truncate table rsak.rsak_date;
insert into rsak.rsak_date(millidate,readable)
values('1357016400000',from_unixtime((1357016400000+(3600000*2))/1000));
insert into rsak.rsak_date(millidate,readable)values('1357016400000',from_unixtime((1357016400000+(3600000*2))/1000));
*/
*/

select reservation_id as id, title,url,status as class, check_in as start, check_out as end 
from rsak.reservation r 
join rsak.kennel k on (r.kennel_id = k.kennel_id)
where k.size = 'small';

select reservation_id as id, title,url,status as class, check_in as start, check_out as end 
from rsak.reservation r 
join rsak.kennel k on (r.kennel_id = k.kennel_id)
where k.size = 'small';

select utc_date();
SELECT unix_timestamp(FROM_UNIXTIME((1384491600000 - (2628000000 * 6)) / 1000)); /* ago: 1368723600 */
SELECT unix_timestamp(FROM_UNIXTIME((1384491600000 + (2628000000 * 6)) / 1000)); /* thn: 1400259600 */
select unix_timestamp(UTC_date()); /*//1387403705 */
select from_unixtime(1387350000);

/* HERE I AM */	
select 
reservation_id as id,ifnull(title,'Vacant'),url,status as class, ifnull(check_in,(1368723600 *1000)) as start, ifnull(check_out,(1400259600*1000)) as end  
from rsak.kennel k
left join rsak.reservation r on (k.kennel_id = r.kennel_id)
where k.size = 'small';


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


/*	
			"id": "293",
			"title": "Dogger 1",
			"url": "http://www.example.com/",
			"class": "event-warning",
			"start": "1384491600000",
			"end":   "1384837200000"
*/
select reservation_id as id, title,url,status as class, check_in as start, check_out as end 
from rsak.reservation r 
join rsak.kennel k on (r.kennel_id = k.kennel_id)
where k.size = 'small';


/* insert into rsak.reservation (client_id, dog_id, kennel_id, check_in, check_out, status, title, url, cost, training, training_amt, notes) values ( */
