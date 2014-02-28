SELECT * FROM rsak.reservation where reservation_id = 26;


/* #/reservation/18 1393857000000	1393986600000 */
/* REQUEST: ( 2014-Mar-04 9:00) 1393923600000,(Fri Mar 07 2014 14:30:00 GMT-0500 (Eastern Standard Time)) 1394200800000 */

select k.kennel_id, k.name, k.size from rsak.kennel k 
join rsak.kennel_attr ka on (k.size = ka.size_name)
where k.kennel_id not in (
select k.kennel_id from rsak.kennel k
join rsak.reservation r on (k.kennel_id = r.kennel_id)
where (r.check_out >= 1393923600000 and r.check_in <= 1393923600000 ))
and ka.size_val >= (select size_val from rsak.kennel_attr where size_name = 'medium'); /* Request check in greater than kennel checkout */

 /* >= r.check_in) /* check_in is after kennel is emptied OR check_out is before kennel is filled*/
/* 
*/;









select * from rsak.kennel k
join rsak.kennel_attr ka on (k.size = ka.size_name)
join rsak.reservation r on (k.kennel_id = r.kennel_id)
where r.check_in <= 1396800000000 
/*and r.check_out >= 1397316600000 */
and ka.size_val >= (select size_val from rsak.kennel_attr where size_name = 'medium');

select r.check_in, r.check_out, r.status, c.first_name, c.last_name,c.phone, c.emergency_name,c.emergency_phone FROM rsak.reservation_id_x rix
join rsak.reservation r on (rix.reservation_id = r.reservation_id)
join rsak.client c on (r.client_id = c.id) 
where master_id = 5 limit 1;

select d.name, d.sex, d.color, d.behavior,r.training,r.training_amt FROM rsak.reservation_id_x rix
join rsak.reservation r on (rix.reservation_id = r.reservation_id)
join rsak.dog d on (r.dog_id = d.id) where master_id = 5;


select d.* from rsak.dog d 
join rsak.client_dog_x cdx on (d.id = cdx.dog_id) 
where cdx.client_id = 2
and d.id not in (
select d.id from rsak.dog d 
join rsak.client_dog_x cdx on (d.id = cdx.dog_id)
join rsak.reservation r on (r.dog_id = d.id)
join rsak.reservation_id_x rix on (rix.reservation_id = r.reservation_id)
where cdx.client_id = 2 
and rix.master_id = 7);


/*
master:5
client:2
in:1390505400000
out:1390681800000
*/





select d.name as dog_name, k.name as kennel_name, concat(r.training,' - ', r.training_amt) as training, r.notes as notes from rsak.reservation_id_x rix 
join rsak.reservation r on (rix.reservation_id = r.reservation_id)
join rsak.dog d on (r.dog_id = d.id)
join rsak.kennel k on (r.kennel_id = k.kennel_id)
where rix.master_id = '1';

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
where k.size = 'large';


select reservation_Id as id, title as title from  rsak.kennel k
join rsak.reservation r on (k.kennel_id = r.kennel_id) 
where k.size = 'large';

select from_unixtime((1357016400000+(3600000*2))/1000);

select from_unixtime((1357016400000)/1000);

/*
truncate table rsak.rsak_date;
insert into rsak.rsak_date(millidate,readable)
values('1357016400000',from_unixtime((1357016400000+(3600000*2))/1000));
insert into rsak.rsak_date(millidate,readable)values('1357016400000',from_unixtime((1357016400000+(3600000*2))/1000));
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


/* NEED TO PRELOAD KENNELS */
/*
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('29', '0', '0', '1', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('30', '0', '0', '2', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('31', '0', '0', '3', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('32', '0', '0', '4', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('33', '0', '0', '5', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('34', '0', '0', '6', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('35', '0', '0', '7', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('36', '0', '0', '8', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('37', '0', '0', '9', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('38', '0', '0', '10', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('39', '0', '0', '11', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('40', '0', '0', '12', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('41', '0', '0', '13', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('42', '0', '0', '14', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rsak`.`reservation` (`reservation_id`, `client_id`, `dog_id`, `kennel_id`, `check_in`, `check_out`, `status`, `title`, `url`, `cost`, `training`, `training_amt`, `notes`, `medication`) VALUES ('43', '0', '0', '15', '233640000000', '233640000000', '0', '0', '0', '0', '0', '0', '0', '0');
*/