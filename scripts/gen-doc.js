#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

function toPascal(str) {
    return str
        .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase()) // 去掉分隔符并大写后一字母
        .replace(/^(.)/, (_, c) => c.toUpperCase()); // 首字母大写
}

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建命令行交互
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 获取组件名
rl.question("请输入组件名称 (如: button): ", async (componentName) => {
    if (!componentName.trim()) {
        console.log("❌ 组件名称不能为空");
        rl.close();
        return;
    }

    const name = componentName.trim().toLowerCase();

    try {
        await generateComponentDoc(name);
        console.log(`✅ 已生成 ${name}.md 文件`);
    } catch (error) {
        console.error(`❌ 生成失败: ${error.message}`);
    }

    rl.close();
});

async function generateComponentDoc(componentName) {
    // 定义目录路径
    const componentsDir = path.join(process.cwd(), "./docs/components");
    const examplesDir = path.join(process.cwd(), "./docs/examples");

    // 检查示例目录
    const exampleComponentDir = path.join(examplesDir, componentName);

    let vueFiles = [];
    try {
        const files = fs.readdirSync(exampleComponentDir);
        vueFiles = files
            .filter((file) => file.endsWith(".vue"))
            .sort((a, b) => {
                const numA = parseInt(a.match(/\d+/)?.[0]) || 0;
                const numB = parseInt(b.match(/\d+/)?.[0]) || 0;
                return numA - numB;
            });
    } catch (error) {
        console.log(`⚠️  没有找到 examples/${componentName} 目录或无法读取`);
    }

    // 生成 import 语句
    const imports =
        vueFiles.length > 0
            ? vueFiles
                  .map((file) => {
                      const caseName = file.replace(".vue", "");
                      return `import ${caseName} from '../examples/${componentName}/${file}'`;
                  })
                  .join("\n")
            : "// 暂无示例文件";

    // 生成 ExampleViewer 使用
    const examples =
        vueFiles.length > 0
            ? vueFiles
                  .map((file) => {
                      const caseName = file.replace(".vue", "");
                      return `<ExampleViewer name="${componentName}" case="${caseName}" />`;
                  })
                  .join("\n\n")
            : "<!-- 暂无示例 -->";

    // 生成 Markdown 内容
    const content = `<script setup>
import { ref } from 'vue'
${imports}

const attributes = ref([
    { name: '', description: '', type: '', default: '', value: '' }
])

const events = ref([
    { name: '', description: '', params: '' }
])

const slots = ref([
    { name: '', description: '' }
])

const exposes = ref([
    { name: '', description: '', type: '' }
])
</script>

# ${toPascal(componentName)}

## 基础用法
${examples}

## API
### Attributes
<ApiTable :data="attributes" type="attributes" />

### Events
<ApiTable :data="events" type="events" />

### Slots
<ApiTable :data="slots"  type="slots" subTag="" />

### Exposes
<ApiTable :data="exposes" type="exposes" />
`;

    // 写入文件
    const outputPath = path.join(componentsDir, `${componentName}.md`);

    // 确保 components 目录存在
    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content, "utf8");
    console.log(`📋 找到 ${vueFiles.length} 个 .vue 文件`);
}
