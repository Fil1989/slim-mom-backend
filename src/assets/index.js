const getListProducts = (products, groupBlood) =>
  products
    .filter((el, _, arr) => {
      if (el.groupBloodNotAllowed[Number(groupBlood)]) return arr
    })
    .flatMap(el => el.categories)
    .reduce((acc, el, ind, arr) => {
      arr.indexOf(el) === ind ? acc.push(el) : acc
      return acc
    }, [])

const getListFoundProducts = (products, normalizedQuery) =>
  products
    .filter(el => {
      const nameProd = el.title.ru.toLowerCase()
      return nameProd.includes(normalizedQuery)
    })
    .map(el => {
      return { kcal: el.calories, weight: el.weight, title: el.title.ru, id: el._id }
    })

module.exports = { getListProducts, getListFoundProducts }
