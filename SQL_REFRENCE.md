# Refer for STUFF,SUM,INNER JOIN
```SELECT BookingHdr.HotelId,BookingHdr.BookingId,GuestName,PaymentType,PaymentStatus,BillAmount,ConfigName as PaymentName,PaymentTo,
BookingHdr.BookingFrom,
STUFF ((SELECT RoomNum +',' FROM BookingDtl 
WHERE BookingDtl.BookingId=BookingHdr.BookingId    FOR XML PATH('')), 1, 0, '') AS RoomNum,

STUFF((SELECT SUM(ExtraFacilityDetails.Count*ExtraFacilityMaster.Tariff)
FROM ExtraFacilityDetails
INNER JOIN ExtraFacilityMaster
ON ExtraFacilityDetails.ExtraFacilityId = ExtraFacilityMaster.ExtraFacilityId
WHERE ExtraFacilityDetails.BookingId=BookingHdr.BookingId FOR XML PATH('')), 1, 0, '') AS TotalExtraFacilityCharge

FROM BookingHdr,ConfigurationMaster,ConfigurationType
WHERE ConfigurationType.TypeName='Payment Type' AND ConfigurationType.TypeId=ConfigurationMaster.TypeId 
AND ConfigId=PaymentType AND BookingHdr.HotelId=15 AND CAST(BookingDate AS DATE)='2021-04-17' AND BookingStatus !='C' 
GROUP BY BookingHdr.BookingId,BookingHdr.HotelId,GuestName,PaymentType,BillAmount,ConfigName,PaymentStatus,PaymentTo,BookingFrom 
ORDER BY BookingHdr.BookingId
```
# Checking DEADLOCK and Kill Process!
```
SELECT sqltext.TEXT,
req.session_id,
req.status,
req.command,
req.cpu_time,
req.total_elapsed_time
FROM sys.dm_exec_requests req
CROSS APPLY sys.dm_exec_sql_text(sql_handle) AS sqltext;

KILL [session_id]
```

# SPLIT and Search in table
```
SELECT a.*,b.FromTime,b.ToTime,b.IntervalTime,b.SlotIds,b.SlotDays FROM DoctorSlotsMapp AS a, DoctorSlotTimes AS b 
WHERE a.DoctorSlotTimeId=b.DoctorSlotTimeId AND a.ToDate BETWEEN @fromDate AND @toDate AND a.FromDate <= @fromDate 
AND a.DoctorId='1189' 
AND a.HospitalId='1077'
AND EXISTS (SELECT * FROM STRING_SPLIT(@tags, ',') WHERE value = a.SlotDay)
```
