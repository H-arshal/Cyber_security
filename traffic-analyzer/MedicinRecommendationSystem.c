#include <stdio.h>
#include <string.h>
#define MAX_MEDICINES 200
struct Medicine{
    int medID;
    char name[50];
    char category[30];
    char symptoms[100];
    int stock;
};

struct Medicine medicines[MAX_MEDICINES];
int medicineCount = 0;

void addOrUpdateMedicine(){
    int id, found = 0;
    printf("\nEnter Medicine ID: ");
    scanf("%d", &id);

    for (int i = 0; i < medicineCount; i++)
    {
        if (medicines[i].medID == id)
        {
            printf("Medicine already exists. Updating details...\n");

            printf("Enter Medicine Name: ");
            scanf(" %s", medicines[i].name);

            printf("Enter Category: ");
            scanf(" %s", medicines[i].category);

            printf("Enter Symptoms it treats: ");
            scanf(" %s", medicines[i].symptoms);

            printf("Enter Stock: ");
            scanf("%d", &medicines[i].stock);

            found = 1;
            break;
        }
    }

    if (!found)
    {
        medicines[medicineCount].medID = id;

        printf("Enter Medicine Name: ");
        scanf(" %s", medicines[medicineCount].name);

        printf("Enter Category: ");
        scanf(" %s", medicines[medicineCount].category);

        printf("Enter Symptoms it treats: ");
        scanf(" %s", medicines[medicineCount].symptoms);

        printf("Enter Stock: ");
        scanf("%d", &medicines[medicineCount].stock);

        medicineCount++;
        printf("Medicine added successfully!\n");
    }
}

void displayMedicines(){
    printf("\n--- List of Medicines ---\n");
    for (int i = 0; i < medicineCount; i++)
    {
        printf("%d, %s, %s, %s, %d\n",
               medicines[i].medID, medicines[i].name, medicines[i].category,
               medicines[i].symptoms, medicines[i].stock);
    }
}

void searchByName(){
    char searchName[50];
    int found = 0;
    printf("\nEnter Medicine Name to search: ");
    scanf("%s", searchName);

    for (int i = 0; i < medicineCount; i++)
    {
        if (strcmp(medicines[i].name, searchName) == 0)
        {
            printf("\nMedicine Found:\n");
            printf("%d, %s, %s, %s, %d\n",
                   medicines[i].medID, medicines[i].name, medicines[i].category,
                   medicines[i].symptoms, medicines[i].stock);
            found = 1;
            break;
        }
    }

    if (!found)
    {
        printf("Medicine not found!\n");
    }
}

void searchByID()
{
    int searchID, found = 0;
    printf("\nEnter Medicine ID to search: ");
    scanf("%d", &searchID);

    for (int i = 0; i < medicineCount; i++)
    {
        if (medicines[i].medID == searchID)
        {
            printf("\nMedicine Found:\n");
            printf("%d, %s, %s, %s, %d\n",
                   medicines[i].medID, medicines[i].name, medicines[i].category,
                   medicines[i].symptoms, medicines[i].stock);
            found = 1;
            break;
        }
    }

    if (!found)
    {
        printf("Medicine not found!\n");
    }
}

void printCategory()
{
    char searchCategory[30];
    int found = 0;

    printf("\nEnter Category to search: ");
    scanf(" %s", searchCategory);

    printf("\n--- Medicines in Category '%s' ---\n", searchCategory);

    for (int i = 0; i < medicineCount; i++)
    {
        if (strcmp(medicines[i].category, searchCategory) == 0)
        {
            printf("ID: %d, Name: %s, Category: %s, Symptoms: %s, Stock: %d\n",
                   medicines[i].medID, medicines[i].name, medicines[i].category,
                   medicines[i].symptoms, medicines[i].stock);
            found = 1;
        }
    }

    if (!found)
    {
        printf("No medicines found for category '%s'\n", searchCategory);
    }
}

void sortMedicinesByName()
{
    struct Medicine temp;

    for (int i = 0; i < medicineCount - 1; i++)
    {
        for (int j = i + 1; j < medicineCount; j++)
        {
            if (strcmp(medicines[i].name, medicines[j].name) > 0)
            {
                temp = medicines[i];
                medicines[i] = medicines[j];
                medicines[j] = temp;
            }
        }
    }

    printf("\nMedicines sorted alphabetically by name.\n");
    displayMedicines();
}

int main()
{
    int choice;
    while (1)
    {
        printf("==============================================");
        printf("\n=== Medicine Recommendation System ===\n");
        printf("1. Add/Update Medicine\n");
        printf("2. Show All Medicines\n");
        printf("3. Search Medicine by Name\n");
        printf("4. Search Medicine by ID\n");
        printf("5. Print Medicines by Category to File\n");
        printf("6. Sort Medicines Alphabetically by Name\n");
        printf("7. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        printf("==============================================");
        if (choice == 1)
        {
            addOrUpdateMedicine();
        }
        else if (choice == 2)
        {
            displayMedicines();
        }
        else if (choice == 3)
        {
            searchByName();
        }
        else if (choice == 4)
        {
            searchByID();
        }
        else if (choice == 5)
        {
            printCategory();
        }
        else if (choice == 6)
        {
            sortMedicinesByName();
        }
        else if (choice == 7)
        {
            printf("Exiting program.\n");
            break;
        }
        else
        {
            printf("Invalid choice. Please tTry again.\n");
        }
    }
    return 0;
}
