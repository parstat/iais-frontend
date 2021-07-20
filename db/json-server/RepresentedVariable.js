module.exports =[
{
    "id" : 1,
    "LocalId" : "NUM_REP_SEX",
    "Name" : "Numeric representation of Sex",
    "Description" : null,
    "Version" : "1.0",
    "VersionDate" : 20210101,
    "Definition" : null,
    "Variable" : {
        "id" : 1,
        "LocalId" : "SEX",
        "Name" : "Sex",
        "Description" : "Sex of a Person",
        "Version" : "1.0",
        "VersionDate" : 20210101,
        "VersionRationale" : null,
        "Definition" : "Sex of a Person",
        "Measures" : {
            "id" : 1,
            "LocalId" : "PERSON",
            "Name" : "Person",
            "Description" : "",
            "Version" : "1.0",
            "VersionDate" : 20210101,
            "VersionRationale" : "First version",
            "Definition" : ""
        }
    },
    "SubstantiveValueDomain" : {
		"id" : 1,
		"LocalId" : "NUM_SEX_VALUE_DOMAIN",
		"Name" : "Numeric Sex valueset",
		"Description" : null,
		"LevelNumber" : 0,
		"Expression" : null,
		"ValueDomainType" : "ENUMERATED",
		"DataType" : "INT",
		"MeasurementUnitId" : null,
		"NodeSet" : {
            "id" : 1,
            "LocalId" : "NUMERIC_SEC_CODELIST",
            "Name" : "Numeric sex codelist",
            "Description" : null,
            "Version" : "1.0",
            "VersionDate" : 20210101,
            "VersionRationale" : null,
            "Definition" : null,
            "NodeSetType" : "CODE_LIST",
            "Link" : null,
            "Nodes": [
                {
                    "id" : 1,
                    "Code" : "1",
                    "Label" : "Male"
                },
                {
                    "id" : 2,
                    "Code" : "2",
                    "Label" : "Female"
                }
            ]
        }
	}
}
];