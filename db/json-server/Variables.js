module.exports =[

	{
		"id" : 1,
		"LocalId" : "SEX",
		"Name" : "Sex",
		"Description" : "Sex of a Person",
		"Version" : "1.0",
		"VersionDate" : 20210101,
		"VersionRationale" : null,
		"Definition" : "Sex of a Person",
		"Measures" : {
			"Id" : 1,
			"LocalId" : "PERSON",
			"Name" : "Person",
			"Description" : "",
			"Version" : "1.0",
			"VersionDate" : 20210101,
			"VersionRationale" : "First version",
			"Definition" : ""
		},
       "Representations": [
        {
            "id" : 1,
            "LocalId" : "NUM_REP_SEX",
            "Name" : "Numeric representation of Sex",
            "Description" : null,
            "Version" : "1.0",
            "VersionDate" : 20210101
        },
        {
            "id" : 2,
            "LocalId" : "CHAR_REP_SEX",
            "Name" : "Char Representation of Variable Sex",
            "Description" : null,
            "Version" : "1.0",
            "VersionDate" : 20210101
        }
    ]
	},
	{
		"id" : 2,
		"LocalId" : "AGE",
		"Name" : "Age",
		"Description" : "Age of a Person",
		"Version" : "1.0",
		"VersionDate" : 20210101,
		"VersionRationale" : null,
		"Definition" : "Age if a person",
		"Measures" : {
			"Id" : 1,
			"LocalId" : "PERSON",
			"Name" : "Person",
			"Description" : "",
			"Version" : "1.0",
			"VersionDate" : 20210101,
			"VersionRationale" : "First version",
			"Definition" : ""
		},
	    "Representations": []
	},
	{
		"id" : 3,
		"LocalId" : "ACTIVITY",
		"Name" : "Business Activity",
		"Description" : "Business Activity of an Enterprize",
		"Version" : "1.0",
		"VersionDate" : 20210101,
		"VersionRationale" : null,
		"Definition" : "Business Activiy of an Enterprize",
		"Measures" : {
			"Id" : 2,
			"LocalId" : "ENTERPRIZE",
			"Name" : "Enterprize",
			"Description" : null,
			"Version" : "1.0",
			"VersionDate" : 20210101,
			"VersionRationale" : "First version",
			"Definition" : null
		}		,
	    "Representations": []
	}

];