module.exports = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Header/>
        <soapenv:Body>
          <ReferenceDataSearchReq TraceId="{{TraceId}}" TargetBranch="{{targetBranch}}" RetrieveProviderReservationDetails="true" xmlns="http://www.travelport.com/schema/util_v47_0">
            <BillingPointOfSaleInfo OriginApplication="UAPI" xmlns="http://www.travelport.com/schema/common_v47_0"/>
            <ReferenceDataSearchModifiers MaxResults="20" ProviderCode="1G"/>
            <ReferenceDataSearchItem Type="{{dataType}}" Code="{{dataCode}}" />
          </ReferenceDataSearchReq>
        </soapenv:Body>
    </soapenv:Envelope>
`;
