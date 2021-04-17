Refer for STUFF,SUM,INNER JOIN
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
