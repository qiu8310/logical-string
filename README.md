# logical-string

支持 `&&` 和 `||` 及 `()` 组合的字符串，方便以字符串的形式配置逻辑组合条件，如 `a && (b || c)`

另外支持在条件前使用 `!` 表示非操作，但不支持在 `()` 前使用，如支持 `a && !b`，但不支持 `!(a || b)`


## Installation

```bash
npm i -S logical-string
```


## Usage

```js
import { parse } from 'logical-string'

// 指定字符串中包含元音字母就返回 true
const isContainsVowel = (str) => [ 'a', 'e', 'i', 'o', 'u' ].some(k => str.includes(k))

parse('a && (b || c)', isContainsVowel) // 等介于执行 `true && (false || false)`，所以最终返回 false
```



<!--
## Roadmap

If you have ideas for releases in the future, it is a good idea to list them in the README.
-->

## Changelog

[Changelog](./CHANGELOG.md)


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## License

[MIT](https://choosealicense.com/licenses/mit/)
