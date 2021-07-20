module.exports =[
{
    "Id" : 3,
    "LocalId" : "CAEM_STATISTICAL_CLASSIFICATION",
    "Name" : "CAEM Statistical Classification",
    "Description" : null,
    "Version" : "2018",
    "VersionDate" : 20180101,
    "VersionRationale" : null,
    "Definition" : null,
    "NodeSetType" : "STATISTICAL_CLASSIFICATION",
    "Link" : "",
    "Levels": [
        {
            "Id" : 1,
            "LocalId" : "1",
            "Name" : "Section",
            "Description" : null,
            "LevelNumber" : 1
        },
        {
            "Id" : 2,
            "LocalId" : "2",
            "Name" : "Division",
            "Description" : null,
            "LevelNumber" : 2
        },
        {
            "Id" : 3,
            "LocalId" : "3",
            "Name" : "Group",
            "Description" : null,
            "LevelNumber" : 3
        },
        {
            "Id" : 4,
            "LocalId" : "4",
            "Name" : "Class",
            "Description" : null,
            "LevelNumber" : 4
        }
    ],
    "Nodes": [
        {
            "Id" : 5,
            "Code" : "A",
            "Category" :{
                "Id" : 3,
                "Name" : "AGRICULTURĂ, SILVICULTURĂ ŞI PESCUIT"
            },
            "LevelId" : 1,
            "Children": [
                {
                    "Id" : 26,
                    "Code" : "01",
                    "Category" : {
                        "Id" : 24,
                        "Name" : "Agricultură, vânătoare şi servicii anexe"
                    },
                    "LevelId" : 2,
                    "Children": [

                    ]
                },
                {
                    "Id" : 27,
                    "Code" : "02",
                    "Category" : {
                        "Id" : 25,
                        "Name" : "Silvicultură şi exploatare forestieră"
                    },
                    "LevelId" : 2,
                    "Children": [
                        
                    ]
                },
                {
                    "Id" : 28,
                    "Code" : "03",
                    "Category" : {
                        "Id" : 26,
                        "Name" : "Pescuitul şi acvacultura"
                    },
                    "LevelId" : 2,
                    "Children": [
                        
                    ]
                },
                {
                    "Id" : 29,
                    "Code" : "05",
                    "Category" : {
                        "Id" : 27,
                        "Name" : "Extracţia cărbunelui superior şi inferior"
                    },
                    "LevelId" : 2,
                    "Children": [
                        
                    ]
                },
                {
                    "Id" : 30,
                    "Code" : "06",
                    "Category" : {
                        "Id" : 28,
                        "Name" : "Extracţia petrolului brut şi a gazelor naturale"
                    },
                    "LevelId" : 2,
                    "Children": [
                        
                    ]
                },
                {
                    "Id" : 31,
                    "Code" : "07",
                    "Category" : {
                        "Id" : 29,
                        "Name" : "Extracţia minereurilor metalifere"
                    },
                    "LevelId" : 2,
                    "Children": [
                        
                    ]
                }
            ]
        },
        {
            "Id" : 6,
            "Code" : "B",
            "Category" : {
                "Id" : 4,
                "Name" : "INDUSTRIA EXTRACTIVĂ"
            },
            "LevelId" : 1,
            "Parent" : null
        },
        {
            "Id" : 7,
            "Code" : "C",
            "Category" : {
                "Id" : 5,
                "Name" : "INDUSTRIA PRELUCRĂTOARE"
            },
            "LevelId" : 1
        },
        {
            "Id" : 8,
            "Code" : "D",
            "Category" : {
                "Id" : 6,
                "Name" : "PRODUCŢIA ŞI FURNIZAREA DE ENERGIE ELECTRICĂ ŞI TERMICĂ, GAZE, APĂ CALDĂ ŞI AER CONDIŢIONAT"
            },
            "LevelId" : 1
        },
        {
            "Id" : 9,
            "Code" : "E",
            "Category" : {
                "Id" : 7,
                "Name" : "DISTRIBUŢIA APEI; SALUBRITATE, GESTIONAREA DEŞEURILOR, ACTIVITĂŢI DE DECONTAMINARE"
            },
            "LevelId" : 1
        },
        {
            "Id" : 10,
            "Code" : "F",
            "Category" : {
                "Id" : 8,
                "Name" : "CONSTRUCŢII"
            },
            "LevelId" : 1
        },
        {
            "Id" : 11,
            "Code" : "G",
            "Category" : {
                "Id" : 9,
                "Name" : "COMERŢ CU RIDICATA ŞI CU AMĂNUNTUL; ÎNTREŢINEREA ŞI REPARAREA AUTOVEHICULELOR ŞI A MOTOCICLETELOR"
            },
            "LevelId" : 1
        },
        {
            "Id" : 12,
            "Code" : "H",
            "Category" : {
                "Id" : 10,
                "Name" : "TRANSPORT ŞI DEPOZITARE"
            },
            "LevelId" : 1
        },
        {
            "Id" : 13,
            "Code" : "I",
            "Category" : {
                "Id" : 11,
                "Name" : "ACTIVITĂŢI DE CAZARE ŞI ALIMENTAŢIE PUBLICĂ"
            },
            "LevelId" : 1
        },
        {
            "Id" : 14,
            "Code" : "J",
            "Category" : {
                "Id" : 12,
                "Name" : "INFORMAŢII ŞI COMUNICAŢII"
            },
            "LevelId" : 1
        },
        {
            "Id" : 15,
            "Code" : "K",
            "Category" : {
                "Id" : 13,
                "Name" : "ACTIVITĂŢI FINANCIARE ŞI ASIGURĂRI"
            },
            "LevelId" : 1
        },
        {
            "Id" : 16,
            "Code" : "L",
            "Category" : {
                "Id" : 14,
                "Name" : "TRANZACŢII IMOBILIARE"
            },
            "LevelId" : 1
        },
        {
            "Id" : 17,
            "Code" : "M",
            "Category" : {
                "Id" : 15,
                "Name" : "ACTIVITĂŢI PROFESIONALE, ŞTIINŢIFICE ŞI TEHNICE"
            },
            "LevelId" : 1
        },
        {
            "Id" : 18,
            "Code" : "N",
            "Category" : {
                "Id" : 16,
                "Name" : "ACTIVITĂŢI DE SERVICII ADMINISTRATIVE ŞI ACTIVITĂŢI DE SERVICII SUPORT"
            },
            "LevelId" : 1
        },
        {
            "Id" : 19,
            "Code" : "O",
            "Category" : {
                "Id" : 17,
                "Name" : "ADMINISTRAŢIE PUBLICĂ ŞI APĂRARE; ASIGURĂRI SOCIALE OBLIGATORII"
            },
            "LevelId" : 1
        },
        {
            "Id" : 20,
            "Code" : "P",
            "Category" : {
                "Id" : 18,
                "Name" : "ÎNVĂŢĂMÂNT"
            },
            "LevelId" : 1
        },
        {
            "Id" : 21,
            "Code" : "Q",
            "Category" : {
                "Id" : 19,
                "Name" : "SĂNĂTATE ŞI ASISTENŢĂ SOCIALĂ"
            },
            "LevelId" : 1
        },
        {
            "Id" : 22,
            "Code" : "R",
            "Category" : {
                "Id" : 20,
                "Name" : "ARTĂ, ACTIVITĂŢI DE RECREERE ŞI DE AGREMENT"
            },
            "LevelId" : 1
        },
        {
            "Id" : 23,
            "Code" : "S",
            "Category" : {
                "Id" : 21,
                "Name" : "ALTE ACTIVITĂŢI DE SERVICII"
            },
            "LevelId" : 1
        },
        {
            "Id" : 24,
            "Code" : "T",
            "Category" : {
                "Id" : 22,
                "Name" : "ACTIVITĂŢI ALE GOSPODĂRIILOR CASNICE ÎN CALITATE DE ANGAJATOR DE PERSONAL CASNIC; ACTIVITĂŢI ALE GOSPODĂRIILOR CASNICE DE PRODUCERE DE BUNURI ŞI SERVICII DESTINATE CONSUMULUI PROPRIU"
            },
            "LevelId" : 1
        },
        {
            "Id" : 25,
            "Code" : "U",
            "Category" : {
                "Id" : 23,
                "Name" : "ACTIVITĂŢI ALE ORGANIZAŢIILOR ŞI ORGANISMELOR EXTRATERITORIALE"
            },
            "LevelId" : 1
        }
    ]
}
];