const mongoose = require('mongoose');
require('dotenv').config();
const PersonModel = require('./models/person');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)
    .then(() => {
        console.log('Connected!')
    })
    .catch(() => {
        console.log('Error while connecting to database');
    });

const newPerson = new PersonModel({
    name: "Mohamed Goui",
    age: 24,
    favoriteFoods: ['pizza', 'lasagne']
});

newPerson.save()
    .then(doc => {
        console.log('Added Successfully', doc);
    })
    .catch(err => {
        console.error(err);
    });

const arrayOfPeople = [
    { name: 'Samir', age: 30, favoriteFoods: ['couscous', 'pasta'] },
    { name: 'Ahmed', age: 35, favoriteFoods: ['Salad', 'Fish'] },
    { name: 'Mounir', age: 17, favoriteFoods: ['Burger', 'Chicken Wings'] },
    { name: 'Karim', age: 28, favoriteFoods: ['Crepe', 'Libanais'] }
];

PersonModel.create(arrayOfPeople)
    .then(doc => {
        console.log('Added Successfully', doc);
    })
    .catch(err => {
        console.error(err);
    });

PersonModel.find({ name: 'Mohamed Goui' })
    .then(person => {
        console.log('Person found', person);
    })
    .catch(err => {
        console.error(err);
    });

PersonModel.findOne({ favoriteFoods: { $in: ['pizza'] } })
    .then(food => {
        console.log('Food Found In', food)
    })
    .catch(err => {
        console.error(err);
    });


PersonModel.findById("5f58d06ed211cc66948d5b4c")
    .then(doc => {
        console.log('ID found in', doc);
    })
    .catch(err => {
        console.error(err);
    });


PersonModel.findById("5f58d06ed211cc66948d5b49")
    .then(person => {
        person.favoriteFoods.push("hamburger");
        person.save()
            .then(doc => {
                console.log("hamburger added successfully", doc);
            })
            .catch(err => {
                console.error(err);
            });
    })
    .catch(err => {
        console.error(err);
    });

PersonModel.findOneAndUpdate({ name: 'Mounir' }, { age: 24 }, { new: true })
    .then(doc => {
        console.log('Age changed in', doc);
    })
    .catch(err => {
        console.error(err);
    });

PersonModel.findByIdAndRemove("5f58d06ed211cc66948d5b4d")
    .then(doc => {
        console.log("Person found and removed", doc)
    })
    .catch(err => {
        console.error(err);
    })

PersonModel.remove({ name: "Ahmed" })
    .then(docs => {
        console.log("Persons with name Ahmed was deleted", docs.deletedCount);
    })
    .catch(err => {
        console.error(err);
    })

PersonModel.find({ favoriteFoods: { $in: ['burrito'] } })
    .sort({ name: 'asc' })
    .limit(2)
    .select("-age")
    .exec()
    .then(docs => {
        console.log("People who like burritos", docs);
    })
    .catch(err => {
        console.error(err);
    })

